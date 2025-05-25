import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Dictador {
  id: string;
  name: string;
  territory: string;
  loyalty_to_Carolina: number;
  esclavos: any[];
}

const getLealtadColor = (lealtad: number) => {
  if (lealtad >= 80) return "bg-green-400 text-green-200";
  if (lealtad >= 50) return "bg-yellow-300 text-yellow-900";
  if (lealtad >= 20) return "bg-orange-400 text-orange-900";
  return "bg-red-500 text-red-100";
};

const getLealtadTextColor = (lealtad: number) => {
  if (lealtad >= 80) return "text-green-400";
  if (lealtad >= 50) return "text-yellow-300";
  if (lealtad >= 20) return "text-orange-400";
  return "text-red-400";
};

const DictadorPersonalProfile: React.FC = () => {
  const [dictadores, setDictadores] = useState<Dictador[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedDictador, setSelectedDictador] = useState<Dictador | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/dictadors")
      .then((res) => res.json())
      .then((data) => setDictadores(data));
  }, []);

  useEffect(() => {
    if (selectedId) {
      const found = dictadores.find((d) => d.id === selectedId) || null;
      setSelectedDictador(found);
    } else {
      setSelectedDictador(null);
    }
  }, [selectedId, dictadores]);

  const handleArmarBatalla = () => {
    if (selectedDictador) {
      navigate("/create-battle", { state: { organizerId: selectedDictador.id } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      <h1 className="text-3xl font-extrabold text-indigo-200 mb-6">Buscar Perfil de Dictador</h1>
      <label className="text-lg text-white mb-4">
        Selecciona un dictador:
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="ml-2 p-2 rounded border border-gray-300"
        >
          <option value="">-- Selecciona --</option>
          {dictadores.map((dictador) => (
            <option key={dictador.id} value={dictador.id}>
              {dictador.name} ({dictador.territory})
            </option>
          ))}
        </select>
      </label>

      {selectedDictador && (
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 mt-6 flex flex-col items-center w-full max-w-md">
          <h2 className="text-2xl font-bold text-indigo-100 mb-2">{selectedDictador.name}</h2>
          <div className="text-gray-400 mb-2">ID: {selectedDictador.id}</div>
          <div className="text-indigo-100 mb-2">
            <span className="font-semibold">Territorio:</span> {selectedDictador.territory}
          </div>
          <div className="text-indigo-100 mb-2 flex flex-col items-center w-full">
            <span className="font-semibold mb-1">Lealtad a Carolina:</span>
            <span className={`font-bold ${getLealtadTextColor(selectedDictador.loyalty_to_Carolina)}`}>
              {selectedDictador.loyalty_to_Carolina}%
            </span>
            <div className="w-full bg-gray-700 rounded h-3 mt-1">
              <div
                className={`${getLealtadColor(selectedDictador.loyalty_to_Carolina)} h-3 rounded transition-all duration-300`}
                style={{ width: `${Math.min(Number(selectedDictador.loyalty_to_Carolina), 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="text-indigo-100 mb-4">
            <span className="font-semibold">Esclavos:</span> {selectedDictador.esclavos ? selectedDictador.esclavos.length : 0}
          </div>
          <div className="flex gap-4 mt-4 flex-wrap justify-center">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-bold"
              onClick={handleArmarBatalla}
            >
              Armar Batalla
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
              onClick={() => navigate("/market")}
            >
              Make Trade
            </button>
            <button
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-300 font-bold"
              onClick={() => navigate("/trade-requests")}
            >
              Solicitudes de Trade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictadorPersonalProfile;