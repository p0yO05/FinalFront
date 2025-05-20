import React, { useEffect, useState } from 'react';

export interface Esclavo {
  name: string;
  nickname: string;
  origin: string;
  strength: number | string;
  agility: number | string;
  status: Estado;
  dictadorId: string;
}

type Estado = 'VIVO' | 'MUERTO' | 'HERIDO';

const Esclavos: React.FC = () => {
  const [showLog, setShowLog] = React.useState(false);
  const [slaves, setSlaves] = React.useState<any[]>([]); // Cambia 'any' por el tipo adecuado
  const [showSlavesForm, setShowSlavesForm] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<Esclavo>({
    name: '',
    nickname: '',
    origin: '',
    strength: '',
    agility: '',
    status: 'VIVO',
    dictadorId: '',
  });
  
    const fetchBattles = async () => {
      setLoading(true);
      setError('');
      try {
        //const data = await getBattles();
        //setSlaves(data);
        //console.log(data)
      } catch (error) {
        console.error('Error al obtener las batallas:', error);
        setError('Hubo un problema al cargar las batallas.');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (showLog) {
        fetchBattles();
      }
      // Si quieres cargar siempre las batallas al montar el componente, quita el if y pon fetchBattles() solo
    }, [showLog]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({
        ...prev,
        [name]: name === 'strength' || name === 'agility'
          ? value === '' ? '' : Number(value)
          : value
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Aquí puedes agregar la lógica para guardar el esclavo
      // Por ejemplo: setSlaves([...slaves, { ...form, id: Date.now().toString() }]);
      setShowSlavesForm(false);
    };

  return(
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
        {showLog ? 'Ocultar Registro' : 'Ver Registro de Batallas'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

        {showSlavesForm && 
        <div style={{ padding: '15px', backgroundColor: '#333', color: 'white'}  }>
          <h2>Formulario de Esclavos</h2>
          <form onSubmit={handleSubmit} style={{display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr'}}>
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
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Estado</option>
              <option value="VIVO">Vivo</option>
              <option value="MUERTO">Muerto</option>
              <option value="HERIDO">Herido</option>
            </select>
            <input
              type="number"
              name="agility"
              placeholder="Agilidad"
              value={form.agility}
              onChange={handleChange}
              min={0}
              max={100}
              required
            />
              <input
              type="number"
              name="strength"
              placeholder="Fuerza"
              value={form.strength}
              onChange={handleChange}
              min={0}
              max={100}
              required
            />
            
             <select
              name="dictador"
              value={form.dictadorId}
              onChange={handleChange}
              required
            >
              <option> Dictador </option>
              <option value="dictador1">Dictador 1</option>
              <option value="2">Dictador 2</option>
              <option value="3">Dicatador 3</option>
            </select>
            <button 
              type="submit" 
              style={{gridColumn: '1 / span 2', backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                Agregar Esclavo
            </button>
          </form>
        </div>
        }

        {showLog && 
  <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
    <h2>Esclavos</h2>
    <ul>
      {slaves.length === 0 && <li>No hay esclavos registrados.</li>}
      {slaves.map((slave: Esclavo & { id?: string }) => (
        <li key={slave.id || slave.name} style={{ marginBottom: '15px' }}>
          <strong>{slave.name}</strong> ({slave.nickname})<br />
          Origen: {slave.origin}<br />
          Estado: {slave.status}<br />
          Agilidad: {slave.agility} | Fuerza: {slave.strength}<br />
          Dictador: {slave.dictadorId}
        </li>
      ))}
    </ul>
  </div>
}
    </div>
  );
};

export default Esclavos;