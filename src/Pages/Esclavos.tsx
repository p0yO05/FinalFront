import React, { useEffect, useState } from "react";

export interface Esclavo {
  id?: string;
  name: string;
  nickname: string;
  origin: string;
  strength: number;
  agility: number;
  status: Estado;
  dictadorId: string;
}

type Estado = "Alive" | "Dead" | "Escaped for now" | "Has been set Free";

interface Dictador {
  id: string;
  name: string;
}

// 📌 Mapeo de status al formato correcto
const STATUS_MAP: { [key: string]: Estado } = {
  VIVO: "Alive",
  MUERTO: "Dead",
  HERIDO: "Escaped for now",
};

// 📌 Valores predeterminados
const ESCLAVO_DEFAULTS = {
  strength: 10,
  agility: 10,
  status: STATUS_MAP["VIVO"],
};

const Esclavos: React.FC = () => {
  const [showLog, setShowLog] = useState(false);
  const [slaves, setSlaves] = useState<Esclavo[]>([]);
  const [showSlavesForm, setShowSlavesForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dictadores, setDictadores] = useState<Dictador[]>([]);
  const [form, setForm] = useState<Omit<Esclavo, "id" | "strength" | "agility" | "status">>({
    name: "",
    nickname: "",
    origin: "",
    dictadorId: "",
  });

  // 📌 Cargar dictadores
  useEffect(() => {
    fetch("http://localhost:3000/api/dictadors")
      .then((res) => res.json())
      .then(setDictadores)
      .catch(() => setDictadores([]));
  }, []);

  // 📌 Cargar esclavos reales
  const fetchSlaves = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/esclavos");
      const data = await res.json();
      setSlaves(data);
      console.log("Esclavos cargados:", data);
    } catch (error) {
      setError("Hubo un problema al cargar los esclavos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlaves(); // 🔄 Se carga la lista al iniciar
  }, []);

  // 📌 Manejo de cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📌 Validaciones antes de enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("El nombre del esclavo es obligatorio.");
      return;
    }
    if (!form.nickname.trim()) {
      setError("El apodo del esclavo es obligatorio.");
      return;
    }
    if (!form.origin.trim()) {
      setError("El origen del esclavo es obligatorio.");
      return;
    }
    if (!form.dictadorId || !form.dictadorId.includes("-")) {
      setError("Debes seleccionar un dictador válido.");
      return;
    }

    const esclavoDto = {
      ...form,
      strength: ESCLAVO_DEFAULTS.strength,
      agility: ESCLAVO_DEFAULTS.agility,
      status: ESCLAVO_DEFAULTS.status,
    };

    console.log("Datos enviados al backend:", esclavoDto);

    try {
      const res = await fetch("http://localhost:3000/api/esclavos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(esclavoDto),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);

      if (!res.ok) {
        setError(`Error del backend: ${data.message || "No se pudo registrar el esclavo."}`);
        return;
      }

      setSuccess("¡Esclavo registrado exitosamente!");
      setShowSlavesForm(false);
      setForm({ name: "", nickname: "", origin: "", dictadorId: "" });

      await fetchSlaves(); // 🔄 Recargar lista después del registro
    } catch {
      setError("No se pudo registrar el esclavo debido a un problema de red.");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#1e1e1e", color: "white" }}>
      <h1>Gestión de Esclavos</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "#22c55e" }}>{success}</div>}

      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        <button
          style={{ backgroundColor: "#444", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}
          onClick={() => setShowSlavesForm(!showSlavesForm)}
        >
          {showSlavesForm ? "Ocultar Formulario" : "Nuevo Esclavo"}
        </button>
        <button
          style={{ backgroundColor: "#444", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}
          onClick={() => setShowLog(!showLog)}
        >
          {showLog ? "Ocultar Registro" : "Ver Registro de Esclavos"}
        </button>
      </div>

      {showSlavesForm && (
        <div style={{ padding: "15px", backgroundColor: "#333", color: "white" }}>
          <h2>Formulario de Esclavos</h2>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" }}>
            <input type="text" name="name" placeholder="Nombre del Esclavo" value={form.name} onChange={handleChange} required />
            <input type="text" name="nickname" placeholder="Apodo" value={form.nickname} onChange={handleChange} required />
            <input type="text" name="origin" placeholder="Origen" value={form.origin} onChange={handleChange} required />
            <select name="dictadorId" value={form.dictadorId} onChange={handleChange} required>
              <option value="">Dictador</option>
              {dictadores.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <button type="submit" style={{ gridColumn: "1 / span 2", backgroundColor: "#444", color: "white", padding: "10px 20px", border: "none", cursor: "pointer" }}>
              Agregar Esclavo
            </button>
          </form>
        </div>
      )}

      {showLog && (
        <div style={{ padding: "15px", backgroundColor: "#333", color: "white" }}>
          <h2>Lista de Esclavos</h2>
          <ul>
            {slaves.length === 0 && !loading && <li>No hay esclavos registrados.</li>}
            {slaves.map((slave) => (
              <li key={slave.id}>
                <strong>{slave.name}</strong> ({slave.nickname}) - Origen: {slave.origin}  
                <br /> Dictador ID: {slave.dictadorId}  
                <br /> <span style={{ color: "#FF5555", fontWeight: "bold" }}>Fuerza: {slave.strength}</span>  
                <span style={{ color: "#7DD3FC", fontWeight: "bold", marginLeft: "10px" }}>Agilidad: {slave.agility}</span>  
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Esclavos;