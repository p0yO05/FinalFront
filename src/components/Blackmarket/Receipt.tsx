import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TransactionStatus } from "../../utils/tradegenerator";

interface ReceiptData {
  id?: string;
  sellerId: string;
  buyerDictadorId?: string;
  buyerEsclavoId?: string;
  item: string;
  amount: number;
  description: string;
  transactionType: string;
  status: TransactionStatus;
  createdAt?: string;
}

const Receipt: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: ReceiptData | undefined = location.state;

  if (!data) {
    return (
      <div className="text-center text-red-500 mt-10">
        No hay información de la transacción.
        <br />
        <button className="underline text-blue-300" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    );
  }

  const renderStatus = () => {
    switch (data.status) {
      case TransactionStatus.Completed:
        return <span className="text-green-400 font-bold">✅ Completada</span>;
      case TransactionStatus.Failed:
        return <span className="text-red-400 font-bold">❌ Fallida</span>;
      case TransactionStatus.Pending:
        return <span className="text-yellow-400 font-bold">⏳ Pendiente</span>;
      default:
        return <span className="text-gray-400">Desconocido</span>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-yellow-300 text-center">
          Recibo de Transacción
        </h2>
        <div className="grid grid-cols-1 gap-4 text-lg">
          {data.id && (
            <div>
              <strong className="text-gray-400">ID:</strong> {data.id}
            </div>
          )}
          <div>
            <strong className="text-gray-400">Vendedor:</strong> {data.sellerId}
          </div>
          {data.buyerDictadorId && (
            <div>
              <strong className="text-gray-400">Comprador (Dictador):</strong>{" "}
              {data.buyerDictadorId}
            </div>
          )}
          {data.buyerEsclavoId && (
            <div>
              <strong className="text-gray-400">Comprador (Esclavo):</strong>{" "}
              {data.buyerEsclavoId}
            </div>
          )}
          <div>
            <strong className="text-gray-400">Ítem:</strong> {data.item}
          </div>
          <div>
            <strong className="text-gray-400">Cantidad:</strong> {data.amount}
          </div>
          <div>
            <strong className="text-gray-400">Tipo de Transacción:</strong> {data.transactionType}
          </div>
          <div>
            <strong className="text-gray-400">Descripción:</strong> {data.description}
          </div>
          <div>
            <strong className="text-gray-400">Estado:</strong> {renderStatus()}
          </div>
          {data.createdAt && (
            <div>
              <strong className="text-gray-400">Fecha:</strong>{" "}
              {new Date(data.createdAt).toLocaleString()}
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-bold"
            onClick={() => navigate("/black-market")}
          >
            Volver al mercado
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
