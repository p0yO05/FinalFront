import React, { useEffect, useState } from 'react';
import { TransactionType, TransactionStatus } from '../types/types';

export interface BlackMarketTransaction {
  buyerEsclavoId?: string;      // Solo si es SlaveToDictador
  buyerDictadorId?: string;     // Solo si es DictadorToDictador
  sellerId: string;             // ID del dictador vendedor
  item: string;
  amount: number| string;
  transactionType: TransactionType;
  status: TransactionStatus;
}


const Market: React.FC = () => {
  const [showLog, setShowLog] = useState(false);
  const [transactions, setTransactions] = useState<BlackMarketTransaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    buyerEsclavoId: '',
    buyerDictadorId: '',
    sellerId: '',
    item: '',
    amount: '',
    transactionType: TransactionType.SlaveToDictador,
    status: TransactionStatus.Pending,
  });

  // Simulación de fetch
  const fetchTransactions = async () => {
    setLoading(true);
    setError('');
    try {
      // const data = await getTransactions();
      // setTransactions(data);
    } catch (error) {
      setError('Hubo un problema al cargar las transacciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showLog) fetchTransactions();
  }, [showLog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar la transacción
    // setTransactions([...transactions, { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() }]);
    setShowForm(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
      <h1>Mercado Negro</h1>
      <p>Consulta transacciones y patrocinadores del torneo.</p>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Ocultar Formulario' : 'Nueva Transacción'}
        </button>
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowLog(!showLog)}
        >
          {showLog ? 'Ocultar Registro' : 'Ver Registro de Transacciones'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      {showForm &&
        <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
          <h2>Formulario de Transacción</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
            <select
              name="transactionType"
              value={form.transactionType}
              onChange={handleChange}
              required
            >
              <option value={TransactionType.SlaveToDictador}>Esclavo a Dictador</option>
              <option value={TransactionType.DictadorToDictador}>Dictador a Dictador</option>
            </select>
            {form.transactionType === TransactionType.SlaveToDictador && (
              <select
                name="buyerEsclavoId"
                value={form.buyerEsclavoId}
                onChange={handleChange}
                required
              >
              <option value="">Selecciona un Esclavo Comprador</option>
              {/* Aquí deberías mapear los esclavos disponibles */}
              </select>
            )}
            {form.transactionType === TransactionType.DictadorToDictador && (
              <select
                name="buyerDictadorId"
                value={form.buyerDictadorId}
                onChange={handleChange}
                required
              >
              <option value="">Selecciona un Dictador Comprador</option>
              {/* Aquí deberías mapear los dictadores disponibles */}
              </select>
            )}
            <input
              type="text"
              name="sellerId"
              placeholder="ID del Vendedor"
              disabled={true}
              value={form.sellerId}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="item"
              placeholder="Item"
              value={form.item}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Monto"
              value={form.amount}
              onChange={handleChange}
              min={1}
              required
            />
            <button
              type="submit"
              style={{
                gridColumn: '1 / span 2',
                backgroundColor: '#444',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer'
              }}>
              Agregar Transacción
            </button>
          </form>
        </div>
      }

      {showLog &&
        <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
          <h2>Transacciones</h2>
          <ul>
            {transactions.length === 0 && <li>No hay transacciones registradas.</li>}
            {transactions.map((tx,i) => (
              <li key={i} style={{ marginBottom: '15px' }}>
                <strong>{tx.item}</strong> - {tx.amount} ({tx.transactionType})<br />
                Estado: {tx.status}<br />
                Vendedor: {tx.sellerId}<br />
                {tx.buyerEsclavoId && <>Comprador Esclavo: {tx.buyerEsclavoId}<br /></>}
                {tx.buyerDictadorId && <>Comprador Dictador: {tx.buyerDictadorId}<br /></>}
                Fecha: {/*tx?.createdAt*/}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default Market;