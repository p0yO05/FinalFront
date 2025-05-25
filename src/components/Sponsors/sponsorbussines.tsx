import React, { useEffect, useState } from "react";

// Simulación de sponsors generados aleatoriamente
const generateRandomSponsors = (count: number) => {
  const companies = ["Umbrella Corp", "Wayne Enterprises", "Stark Industries", "Oscorp", "LexCorp"];
  const fighters = ["El Destructor", "La Sombra", "El Águila", "La Bestia", "El Fénix"];
  const items = ["Armadura", "Espada legendaria", "Dron espía", "Suero de fuerza", "Escudo indestructible"];

  return Array.from({ length: count }).map((_, i) => ({
    id: `random-${Date.now()}-${i}`,
    company_name: companies[Math.floor(Math.random() * companies.length)],
    preferred_fighter: fighters[Math.floor(Math.random() * fighters.length)],
    donated_items: items[Math.floor(Math.random() * items.length)],
  }));
};

interface SponsorOffer {
  id: string;
  company_name: string;
  preferred_fighter: string;
  donated_items: string;
}

interface Esclavo {
  id: string;
  name: string;
  nickname: string;
}

const SponsorBussines: React.FC = () => {
  const [offers, setOffers] = useState<SponsorOffer[]>([]);
  const [esclavos, setEsclavos] = useState<Esclavo[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<SponsorOffer | null>(null);
  const [selectedEsclavo, setSelectedEsclavo] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Cargar esclavos reales del backend
  useEffect(() => {
    fetch("http://localhost:3000/api/esclavos")
      .then(res => res.json())
      .then(setEsclavos)
      .catch(() => setEsclavos([]));
  }, []);

  // Generar sponsors aleatorios al montar
  useEffect(() => {
    setOffers(generateRandomSponsors(5));
  }, []);

  const handleAcceptOffer = (offer: SponsorOffer) => {
    setSelectedOffer(offer);
    setSuccess("");
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffer || !selectedEsclavo) return;
    // Aquí podrías hacer un POST al backend para asignar el objeto al esclavo
    setSuccess(
      `¡${selectedOffer.donated_items} de ${selectedOffer.company_name} fue asignado a ${esclavos.find(e => e.id === selectedEsclavo)?.name || "el esclavo"}!`
    );
    setSelectedOffer(null);
    setSelectedEsclavo("");
  };

  return (
    <div style={{ padding: "15px", backgroundColor: "#222", color: "white" }}>
      <h2 className="text-xl font-bold text-yellow-200 mb-4">Ofertas de Sponsors</h2>
      {success && <div style={{ color: "#22c55e", marginBottom: 10 }}>{success}</div>}
      <ul>
        {offers.map((offer) => (
          <li key={offer.id} style={{ marginBottom: "18px", background: "#333", borderRadius: 8, padding: 12 }}>
            <strong style={{ color: "#ffd700" }}>{offer.company_name}</strong>
            <div style={{ color: "#7dd3fc" }}>Prefiere: {offer.preferred_fighter}</div>
            <div style={{ color: "#aaa" }}>Ofrece: <b>{offer.donated_items}</b></div>
            <button
              style={{
                marginTop: 8,
                backgroundColor: "#2563eb",
                color: "white",
                padding: "6px 16px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => handleAcceptOffer(offer)}
            >
              Aceptar Oferta
            </button>
          </li>
        ))}
      </ul>
      {selectedOffer && (
        <form onSubmit={handleAssign} style={{ marginTop: 20, background: "#444", padding: 16, borderRadius: 8 }}>
          <div style={{ marginBottom: 10 }}>
            <span>¿A qué esclavo quieres asignar <b>{selectedOffer.donated_items}</b>?</span>
          </div>
          <select
            value={selectedEsclavo}
            onChange={e => setSelectedEsclavo(e.target.value)}
            required
            style={{ padding: 8, borderRadius: 4, marginBottom: 10, width: "100%" }}
          >
            <option value="">Selecciona un esclavo</option>
            {esclavos.map(e => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.nickname})
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "8px 20px",
              border: "none",
              borderRadius: 4,
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Asignar Objeto
          </button>
        </form>
      )}
    </div>
  );
};

export default SponsorBussines;