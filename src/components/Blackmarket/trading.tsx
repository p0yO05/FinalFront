import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateBlackmarketDto, TransactionStatus } from "../../utils/tradegenerator";

interface Dictador {
  id: string;
  name: string;
  territory: string;
}
interface Esclavo {
  id: string;
  nickname: string;
}

const REDIRECT_SECONDS = 30;

const Trading: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const offer: CreateBlackmarketDto | undefined = location.state?.offer;

  const [dictadores, setDictadores] = useState<Dictador[]>([]);
  const [esclavos, setEsclavos] = useState<Esclavo[]>([]);
  const [selectedBuyer, setSelectedBuyer] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState<number>(REDIRECT_SECONDS);

  useEffect(() => {
    if (offer?.onlyForSlaves) {
      fetch("http://localhost:3000/api/esclavos")
        .then(res => res.json())
        .then(setEsclavos);
    } else {
      fetch("http://localhost:3000/api/dictadors")
        .then(res => res.json())
        .then(setDictadores);
    }
  }, [offer]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate("/descubierto");
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, navigate]);

  if (!offer) {
    return (
      <div className="text-red-400 text-center mt-10">
        No hay oferta seleccionada.{" "}
        <button className="underline" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    );
  }

  const handleConfirm = async () => {
  const dto: any = {
    sellerId: offer.sellerId,
    item: offer.item,
    amount: typeof offer.amount === "string" ? Number(offer.amount) : offer.amount,
    transactionType: offer.transactionType,
    status: TransactionStatus.Completed,
  };

  if (offer.transactionType === "SlaveToDictador") {
    dto.buyerEsclavoId = selectedBuyer;
  }
  if (offer.transactionType === "DictadorToDictador") {
    dto.buyerDictadorId = selectedBuyer;
  }

  console.log("Enviando DTO al backend:", dto);

  try {
    const res = await fetch("http://localhost:3000/api/blackmarket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    const data = await res.json().catch(() => ({}));
    console.log("Respuesta del backend:", res.status, data);

    if (res.ok && data.id) {
      alert("¡Transacción realizada! Estado: Completado");
      navigate("/receipt", { state: { ...dto, id: data.id, createdAt: data.createdAt } });
    } else {
      alert("¡Carolina lo descubrió! Estado: Fallido");
      navigate("/receipt", { state: { ...dto } });
    }
  } catch (e) {
    alert("Error de red al realizar la transacción. Estado: Fallido");
    navigate("/receipt", { state: { ...dto } });
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-200 mb-4">Negociar Oferta</h2>
        <div className="mb-2 text-gray-200">{offer.description || "Oferta sin descripción"}</div>
        <div className="mb-2 text-gray-400">
          <span>Vendor ID: </span>
          <span className="font-semibold">{offer.sellerId}</span>
        </div>
        <div className="mb-2 text-gray-400">
          <span>Ítem: </span>
          <span className="font-semibold">{offer.item}</span>
        </div>
        <div className="mb-2 text-gray-400">
          <span>Cantidad: </span>
          <span className="font-semibold">{offer.amount}</span>
        </div>
        <div className="mb-2 text-gray-400">
          <span>Tipo: </span>
          <span className="font-semibold">{offer.transactionType}</span>
        </div>
        <div className="mb-2 text-gray-400">
          <span>Estado: </span>
          <span className="font-semibold">{offer.status || "Pendiente"}</span>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Selecciona tu identidad para negociar:
          </label>
          {offer.onlyForSlaves ? (
            <select
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={selectedBuyer}
              onChange={e => setSelectedBuyer(e.target.value)}
            >
              <option value="">Selecciona un esclavo</option>
              {esclavos.map(e => (
                <option key={e.id} value={e.id}>
                  {e.nickname} (ID: {e.id})
                </option>
              ))}
            </select>
          ) : (
            <select
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={selectedBuyer}
              onChange={e => setSelectedBuyer(e.target.value)}
            >
              <option value="">Selecciona un dictador</option>
              {dictadores.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.territory}) - ID: {d.id}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Precio del objeto:</label>
          <div className="w-full p-2 rounded bg-gray-700 text-white">
            {offer.amount}
          </div>
          <div className="text-xs text-gray-400 mt-1">Este es el precio de la oferta.</div>
        </div>

        <div className="mb-4 text-center">
          <span className="inline-block bg-gray-700 text-gray-300 px-3 py-1 rounded-full font-mono">
            Tiempo antes de ser descubierto: {secondsLeft}s
          </span>
        </div>

        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold w-full"
          onClick={handleConfirm}
          disabled={!selectedBuyer}
        >
          Aceptar
        </button>
        <button
          className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 font-bold w-full"
          onClick={() => navigate(-1)}
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default Trading;
