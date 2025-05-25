import React, { useEffect, useState } from 'react';

export interface Esclavo {
  id?: string;
  name: string;
  nickname: string;
  origin: string;
  strength: number;
  agility: number;
  status: Estado;
  dictadorId: string;
}
type Estado = 'VIVO' | 'MUERTO' | 'HERIDO';

interface Dictador {
  id: string;
  name: string;
}

const ESCLAVO_DEFAULTS = {
  strength: 10,
  agility: 10,
  status: 'VIVO' as Estado,
};

const Esclavos: React.FC = () => {
  const [showLog, setShowLog] = useState(false);
  const [slaves, setSlaves] = useState<Esclavo[]>([]);
  const [showSlavesForm, setShowSlavesForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dictadores, setDictadores] = useState<Dictador[]>([]);
  const [form, setForm] = useState<Omit<Esclavo, "id" | "strength" | "agility" | "status">>({
    name: '',
    nickname: '',
    origin: '',
    dictadorId: '',
  });

  // Cargar dictadores reales para el select
  useEffect(() => {
    fetch("http://localhost:3000/api/dictadors")
      .then(res => res.json())
      .then(setDictadores)
      .catch(() => setDictadores([]));
  }, []);

  // Cargar esclavos reales del backend
  const fetchSlaves = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch("http://localhost:3000/api/esclavos");
      const data = await res.json();
      setSlaves(data);
    } catch (error) {
      setError('Hubo un problema al cargar los esclavos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showLog) fetchSlaves();
  }, [showLog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // DTO para el backend: solo datos básicos, stats predeterminados
    const esclavoDto = {
      ...form,
      strength: ESCLAVO_DEFAULTS.strength,
      agility: ESCLAVO_DEFAULTS.agility,
      status: ESCLAVO_DEFAULTS.status,
    };
    try {
      await fetch("http://localhost:3000/api/esclavos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(esclavoDto),
      });
      setShowSlavesForm(false);
      setForm({
        name: '',
        nickname: '',
        origin: '',
        dictadorId: '',
      });
      fetchSlaves();
    } catch {
      setError("No se pudo registrar el esclavo.");
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
      <h1>Gestión de Esclavos</h1>
      <p>Aquí puedes ver y administrar los datos de los esclavos.</p>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowSlavesForm(!showSlavesForm)}
        >
          {showSlavesForm ? 'Ocultar Formulario' : 'Nuevo Esclavo'}
        </button>
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowLog(!showLog)}
        >
          {showLog ? 'Ocultar Registro' : 'Ver Registro de Esclavos'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      {showSlavesForm &&
        <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
          <h2>Formulario de Esclavos</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
            <input
              type="text"
              name="name"
              placeholder="Nombre del Esclavo"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="nickname"
              placeholder="Apodo"
              value={form.nickname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="origin"
              placeholder="Origen"
              value={form.origin}
              onChange={handleChange}
              required
            />
            <select
              name="dictadorId"
              value={form.dictadorId}
              onChange={handleChange}
              required
            >
              <option value="">Dictador</option>
              {dictadores.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
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
              Agregar Esclavo
            </button>
          </form>
        </div>
      }
      {showLog &&
        <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
          <h2>Esclavos</h2>
          {loading && <div>Cargando...</div>}
          <ul>
            {slaves.length === 0 && !loading && <li>No hay esclavos registrados.</li>}
            {slaves.map((slave) => (
              <li
                key={slave.id || slave.name}
                style={{
                  marginBottom: '15px',
                  backgroundColor: slave.status === 'MUERTO' ? '#4B1E1E' : undefined,
                  color: slave.status === 'MUERTO' ? '#ff5555' : undefined,
                  fontWeight: slave.status === 'MUERTO' ? 'bold' : undefined,
                  border: slave.status === 'MUERTO' ? '2px solid #ff5555' : undefined,
                  borderRadius: slave.status === 'MUERTO' ? '8px' : undefined,
                  padding: slave.status === 'MUERTO' ? '10px' : undefined,
                }}
              >
                <strong>{slave.name}</strong> ({slave.nickname})<br />
                Origen: {slave.origin}<br />
                Estado: <span style={slave.status === 'MUERTO' ? { color: '#ff5555', fontWeight: 'bold' } : {}}>{slave.status}</span><br />
                Agilidad: {slave.agility} | Fuerza: {slave.strength}<br />
               Dictador: {dictadores.find(d => String(d.id) === String(slave.dictadorId))?.name || <span style={{ color: "#aaa" }}>Sin dictador</span>}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default Esclavos;