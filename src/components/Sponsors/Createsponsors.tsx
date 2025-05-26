import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Esclavo {
  id: string;
  name: string;
  nickname: string;
}

const CreateSponsors: React.FC = () => {
  const location = useLocation();
  const sponsor = location.state?.sponsor || null;

  const [esclavos, setEsclavos] = useState<Esclavo[]>([]);
  const [selectedEsclavo, setSelectedEsclavo] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 📌 Cargar esclavos reales del backend
  useEffect(() => {
    const fetchEsclavos = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:3000/api/esclavos");
        setEsclavos(res.data);
      } catch {
        setError("Error al obtener los esclavos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEsclavos();
  }, []);

  const handleSubmit = async () => {
    if (!selectedEsclavo || !sponsor) {
      setMessage("⚠️ Selecciona un esclavo y asegúrate de que haya un sponsor válido.");
      return;
    }

    const payload = {
      company_name: sponsor.sponsorName,
      donated_items: sponsor.itemsDonated.join(", "),
      preferred_fighter: selectedEsclavo
    };

    try {
      await axios.post("http://localhost:3000/api/sponsors", payload, {
        headers: { "Content-Type": "application/json" } // 📌 Asegurar formato correcto
      });
      setMessage(`✅ Sponsor "${sponsor.sponsorName}" asignado a "${selectedEsclavo}" con éxito.`);
    } catch {
      setMessage("❌ Hubo un problema al asignar el sponsor.");
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold">🎁 Oferta de Patrocinio</h2>

      {loading && <div className="mt-4 text-yellow-300">Cargando esclavos...</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}

      {!loading && esclavos.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg text-gray-300">🎯 Selecciona un esclavo antes de asignar el sponsor:</h3>
          <select
            className="text-black p-2 rounded w-full mt-2"
            value={selectedEsclavo}
            onChange={(e) => setSelectedEsclavo(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            {esclavos.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.nickname})
              </option>
            ))}
          </select>
        </div>
      )}

      {sponsor && (
        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold">{sponsor.sponsorName}</h3>
          <p>📦 Ítems ofrecidos: {sponsor.itemsDonated.join(", ")}</p>

          <button 
            className="mt-2 bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={!selectedEsclavo}
          >
            Completar Sponsor
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
};

export default CreateSponsors;