import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spoted: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000); // 10 segundos y redirige al inicio

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 via-black to-yellow-900">
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-yellow-900 bg-opacity-90 border-4 border-yellow-400 rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold text-red-600 mb-6 drop-shadow-lg animate-bounce">
            ¡DESCUBIERTO!
          </h1>
          <p className="text-xl text-yellow-200 mb-4 font-semibold">
            <span className="text-2xl text-red-400 font-black">¡ALERTA!</span> <br />
            Carolina ha rastreado tu ubicación.
          </p>
          <p className="text-lg text-gray-200 mb-6">
            Las sirenas suenan, los reflectores iluminan tu ventana y el rugido de los drones retumba en el aire.<br />
            <span className="text-red-400 font-bold">¡Tu dirección está siendo asediada por Carolina y su ejército digital!</span>
          </p>
          <p className="text-lg text-yellow-300 font-bold mb-8 animate-pulse">
            ¡Empieza a correr! <br />
            Tienes <span className="text-2xl text-red-500 font-extrabold">10 segundos</span> Camarada... te veo en el proximo combate Muajajajajaja
          </p>
          <div className="flex justify-center">
            <svg width="80" height="80" fill="none" viewBox="0 0 24 24" className="animate-spin-slow">
              <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="4" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#fbbf24" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spoted;