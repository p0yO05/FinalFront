import React, { useEffect, useState } from "react";
import SponsorBussines from "./sponsorbussines";

// DTO según tu backend
export interface Sponsor {
  id?: string;
  company_name: string;
  preferred_fighter: string;
  donated_items: string;
}

const SponsorLog: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Sponsor>({
    company_name: "",
    preferred_fighter: "",
    donated_items: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar sponsors del backend
  const fetchSponsors = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/sponsors");
      const data = await res.json();
      setSponsors(data);
    } catch {
      setError("No se pudieron cargar los sponsors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({
        company_name: "",
        preferred_fighter: "",
        donated_items: "",
      });
      fetchSponsors();
    } catch {
      setError("No se pudo registrar el sponsor.");
    }
  };

  return (
    <div style={{ padding: "15px", backgroundColor: "#222", color: "white" }}>
      <h2>Lista de Sponsors</h2>
      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        <button
          style={{
            backgroundColor: "#444",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Ocultar Formulario" : "Nuevo Sponsor"}
        </button>
        <SponsorBussines />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      {showForm && (
        <div style={{ padding: "15px", backgroundColor: "#333", color: "white" }}>
          <h3>Formulario de Sponsor</h3>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" }}>
            <input
              type="text"
              name="company_name"
              placeholder="Nombre de la compañía"
              value={form.company_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="preferred_fighter"
              placeholder="Luchador preferido"
              value={form.preferred_fighter}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="donated_items"
              placeholder="Ítems donados"
              value={form.donated_items}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              style={{
                gridColumn: "1 / span 2",
                backgroundColor: "#444",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Agregar Sponsor
            </button>
          </form>
        </div>
      )}
      {loading && <div>Cargando sponsors...</div>}
      <ul>
        {sponsors.length === 0 && !loading && <li>No hay sponsors registrados.</li>}
        {sponsors.map((sponsor) => (
          <li key={sponsor.id || sponsor.company_name} style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#ffd700" }}>{sponsor.company_name}</strong>
            <div style={{ color: "#7dd3fc" }}>Luchador preferido: {sponsor.preferred_fighter}</div>
            <div style={{ color: "#aaa" }}>Ítems donados: {sponsor.donated_items}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SponsorLog;