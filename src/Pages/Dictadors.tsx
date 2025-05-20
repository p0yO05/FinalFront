import React, { useState, useEffect } from 'react';


export interface Dictador {
  id: string;
  name: string;
  territory: string;
  loyalty_to_Carolina: number | string;
}

const Dictators: React.FC = () => {
  const [showLog, setShowLog] = useState(false);
  const [dictadors, setDictadors] = useState<Dictador[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    territory: '',
    loyalty_to_Carolina: '',
  }
  );

  // Simulación de fetch
  const fetchDictadors = async () => {
    setLoading(true);
    setError('');
    try {
      // const data = await getDictadors();
      // setDictadors(data);
    } catch (error) {
      setError('Hubo un problema al cargar los dictadores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showLog) fetchDictadors();
  }, [showLog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'loyalty_to_Carolina' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setDictadors([...dictadors, { ...form, id: Date.now().toString() }]);
    setShowForm(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
      <h1>Dictadores</h1>
      <p>Administra los perfiles de los dictadores y sus territorios.</p>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Ocultar Formulario' : 'Nuevo Dictador'}
        </button>
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowLog(!showLog)}
        >
          {showLog ? 'Ocultar Registro' : 'Ver Registro de Dictadores'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      {showForm &&
        <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
          <h2>Formulario de Dictador</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
            <input
              type="text"
              name="name"
              placeholder="Nombre del Dictador"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="territory"
              placeholder="Territorio"
              value={form.territory}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="loyalty_to_Carolina"
              placeholder="Lealtad a Carolina"
              value={form.loyalty_to_Carolina}
              onChange={handleChange}
              min={0}
              max={100}
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
              Agregar Dictador
            </button>
          </form>
        </div>
      }

      {showLog &&
        <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
          <h2>Dictadores Registrados</h2>
          <ul>
            {dictadors.length === 0 && <li>No hay dictadores registrados.</li>}
            {dictadors.map(dictador => (
              <li key={dictador.id} style={{ marginBottom: '15px' }}>
                <strong>{dictador.name}</strong><br />
                Territorio: {dictador.territory}<br />
                Lealtad a Carolina: {dictador.loyalty_to_Carolina}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default Dictators;