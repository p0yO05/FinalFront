import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRandomBlackmarketOffers, CreateBlackmarketDto } from "../../utils/tradegenerator";

interface Dictador {
  id: string;
  name: string;
  territory: string;
}

interface Esclavo {
  id: string;
  nickname: string;
}

const Createtrade: React.FC = () => {
  const [dictadores, setDictadores] = useState<Dictador[]>([]);
  const [esclavos, setEsclavos] = useState<Esclavo[]>([]);
  const [offers, setOffers] = useState<CreateBlackmarketDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    setError("");
    Promise.all([
      fetch("http://localhost:3000/api/dictadors").then(res => res.json()),
      fetch("http://localhost:3000/api/esclavos").then(res => res.json())
    ])
      .then(([dictadoresData, esclavosData]) => {
        setDictadores(dictadoresData);
        setEsclavos(esclavosData);
        setOffers(createRandomBlackmarketOffers(dictadoresData, esclavosData, 7));
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las ofertas.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNegociar = (offer: CreateBlackmarketDto) => {
    // Filtrar `description` antes de navegar, pero mantenerla en la UI
    const { description, ...sanitizedOffer } = offer;
    navigate("/trade", { state: { offer: sanitizedOffer } });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-yellow-200 mb-4">Ofertas Verdaderas de Blackmarket</h2>
      <div className="flex gap-4 mb-4">
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded font-bold hover:bg-blue-800"
          onClick={fetchData}
        >
          Buscar nuevas ofertas
        </button>
        {error && <span className="text-red-400">{error}</span>}
      </div>
      {loading ? (
        <div className="text-gray-300">Cargando ofertas...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, idx) => (
            <div key={offer.sellerId + offer.item + idx} className="bg-gray-800 rounded-lg p-4 shadow flex flex-col">
              <div className="mb-2">
                <span className="font-semibold text-yellow-300">{offer.item}</span>
              </div>
              <div className="mb-2 text-gray-200">{offer.description}</div> {/* Descripción agregada correctamente */}
              <div className="mb-2 text-gray-400">
                <span>Vendedor ID: </span>
                <span className="font-semibold">{offer.sellerId}</span>
              </div>
              <div className="mb-2 text-gray-400">
                <span>Precio: </span>
                <span className="font-semibold">{offer.amount}</span> {/* Formato correcto "500.00" */}
              </div>
              <div className="mb-2 text-gray-400">
                <span>Tipo: </span>
                <span className="font-semibold">{offer.transactionType}</span>
              </div>
              <div className="mb-2 text-gray-400">
                <span>Estado: </span>
                <span className="font-semibold">{offer.status}</span>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
                onClick={() => handleNegociar(offer)}
              >
                Negociar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Createtrade;