import React, { useEffect, useState, useRef } from "react";
import { createRandomBlackmarketOffers } from "../../utils/tradegenerator";
import { useNavigate } from "react-router-dom";

// Interfaces para Dictador y Esclavo
interface Dictador {
  id: string;
  name: string;
  territory: string;
}
interface Esclavo {
  id: string;
  nickname: string;
}

// 10 dictadores falsos
const fakeDictadores: Dictador[] = [
  { id: "1", name: "Augusto", territory: "Chile" },
  { id: "2", name: "Leónidas", territory: "Esparta" },
  { id: "3", name: "Napoleón", territory: "Francia" },
  { id: "4", name: "Stalin", territory: "URSS" },
  { id: "5", name: "Kim", territory: "Corea del Norte" },
  { id: "6", name: "César", territory: "Roma" },
  { id: "7", name: "Mussolini", territory: "Italia" },
  { id: "8", name: "Idi Amin", territory: "Uganda" },
  { id: "9", name: "Trujillo", territory: "R.D." },
  { id: "10", name: "Franco", territory: "España" },
];
// 5 esclavos falsos
const fakeEsclavos: Esclavo[] = [
  { id: "a", nickname: "Toby" },
  { id: "b", nickname: "Chucho" },
  { id: "c", nickname: "Pepe" },
  { id: "d", nickname: "Lola" },
  { id: "e", nickname: "Milo" },
];

const CreateTradeOffers: React.FC = () => {
  const [offers, setOffers] = useState<ReturnType<typeof createRandomBlackmarketOffers>>([]);
  const [secretIndex, setSecretIndex] = useState<number>(-1);
  const navigate = useNavigate();
  const clickCount = useRef(0);

  useEffect(() => {
    const generatedOffers = createRandomBlackmarketOffers(fakeDictadores, fakeEsclavos, 7);
    setOffers(generatedOffers);
    setSecretIndex(generatedOffers.length > 0 ? Math.floor(Math.random() * generatedOffers.length) : -1);
  }, []);

  const handleSecretClick = (idx: number) => {
    if (idx === secretIndex) {
      clickCount.current += 1;
      if (clickCount.current >= 3) {
        navigate("/black-market");
        clickCount.current = 0;
      } else {
        navigate("/market");
      }
    } else {
      navigate("/market");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-yellow-200 mb-4">Tienda Falsa del Mercado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer, idx) => (
          <div key={offer.sellerId + offer.item + idx} className="bg-gray-800 rounded-lg p-4 shadow flex flex-col">
            <div className="mb-2">
              <span className="font-semibold text-yellow-300">{offer.item}</span>
            </div>
            <div className="mb-2 text-gray-200">{offer.description}</div>
            <div className="mb-2 text-gray-400">
              <span>Vendedor ID: </span>
              <span className="font-semibold">{offer.sellerId}</span>
            </div>
            <div className="mb-2 text-gray-400">
              <span>Cantidad: </span>
              <span className="font-semibold">{offer.amount}</span>
            </div>
            <div className="mb-2 text-gray-400">
              <span>Tipo: </span>
              <span className="font-semibold">{offer.transactionType}</span>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400 font-bold"
              onClick={() => handleSecretClick(idx)}
            >
              Negociar!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateTradeOffers;