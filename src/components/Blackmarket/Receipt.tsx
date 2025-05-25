import React from "react";
import { useNavigate } from "react-router-dom";

export enum TransactionStatus {
  Completed = "Completado!",
  Failed = "Fallido",
  Discovered = "Descubierto!",
}

export enum TransactionType {
  SlaveToDictador = "SlaveToDictador",
  DictadorToDictador = "DictadorToDictador",
}

interface Dictador {
  id: string;
  name: string;
}

interface Esclavo {
  id: string;
  nickname: string;
}

interface ReceiptProps {
  id?: string;
  buyerEsclavo?: Esclavo | null;
  buyerDictador?: Dictador | null;
  sellerDictador?: Dictador | null;
  item?: string;
  amount?: number;
  transactionType?: TransactionType;
  status?: TransactionStatus;
  createdAt?: string | Date;
  error?: boolean;
}

const Receipt: React.FC<ReceiptProps> = ({
  id,
  buyerEsclavo,
  buyerDictador,
  sellerDictador,
  item,
  amount,
  transactionType,
  status,
  createdAt,
  error,
}) => {
  const navigate = useNavigate();

  // Si hay error, status fallido, o faltan datos esenciales, mostrar solo "Negocio Fallido"
  if (
    error ||
    status === TransactionStatus.Failed ||
    !id ||
    !status ||
    !transactionType
  ) {
    return (
      <div className="bg-gray-800 border-2 border-red-600 rounded-lg shadow-lg p-6 max-w-md mx-auto my-4 text-gray-100 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Negocio Fallido
        </h2>
        <button
          className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 font-bold"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border-2 border-gray-600 rounded-lg shadow-lg p-6 max-w-md mx-auto my-4 text-gray-100">
      <h2 className="text-xl font-bold mb-2">Recibo de Transacción</h2>
      <div className="mb-2">
        <span className="font-semibold">ID:</span> {id}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Fecha:</span>{" "}
        {createdAt
          ? typeof createdAt === "string"
            ? new Date(createdAt).toLocaleString()
            : createdAt.toLocaleString()
          : "N/A"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Tipo:</span> {transactionType}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Estado:</span>{" "}
        <span
          className={
            status === TransactionStatus.Completed
              ? "text-red-400"
              : "text-yellow-400"
          }
        >
          {status}
        </span>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Ítem:</span> {item}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Cantidad:</span> {amount}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Comprador:</span>{" "}
        {buyerDictador
          ? buyerDictador.name
          : buyerEsclavo
          ? buyerEsclavo.nickname
          : "N/A"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Vendedor:</span>{" "}
        {sellerDictador ? sellerDictador.name : "N/A"}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 font-bold w-full"
        onClick={() => navigate(-1)}
      >
        Regresar
      </button>
    </div>
  );
};

export default Receipt;