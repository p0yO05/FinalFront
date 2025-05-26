import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SponsorGenerator from "./../../utils/sponsorgenerator";

const SponsorLog: React.FC = () => {
  const [generatedSponsors, setGeneratedSponsors] = useState<any[]>([]);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-yellow-200 mb-4">🎖️ Mercado de Sponsors</h2>

      <SponsorGenerator onLoad={setGeneratedSponsors} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {generatedSponsors.map((sponsor, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 shadow flex flex-col">
            <div className="mb-2">
              <span className="font-semibold text-yellow-300">{sponsor.sponsorName}</span>
            </div>
            <div className="mb-2 text-gray-200">
              Oferta abierta: {sponsor.sponsorName} ofrece patrocinio a cualquier esclavo interesado.
            </div>
            <div className="mb-2 text-gray-400">
              <span>📦 Ítems ofrecidos:</span> <span className="font-semibold">{sponsor.itemsDonated.join(", ")}</span>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
              onClick={() => navigate("/create-sponsor", { state: { sponsor } })}
            >
              Negociar!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorLog;