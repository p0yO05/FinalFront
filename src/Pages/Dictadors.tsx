import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DictadorLog from '../components/Profile/Dictadorlog';

interface Dictador {
  id: string;
  name: string;
  territory: string;
  loyalty_to_Carolina: number;
  esclavos: any[];
  createdAt?: string;
}

const Dictators: React.FC = () => {
  const navigate = useNavigate();
  const [showLog, setShowLog] = useState(false);
  const [dictadores, setDictadores] = useState<Dictador[]>([]);

  useEffect(() => {
    if (showLog) {
      fetch("http://localhost:3000/api/dictadors")
        .then((res) => res.json())
        .then((data) => setDictadores(data));
    }
  }, [showLog]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
      <h1 style={{ marginBottom: '20px' }}>Dictadores</h1>
      <p>Administra los perfiles de los dictadores y sus territorios.</p>

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowLog(!showLog)}
        >
          {showLog ? 'Ocultar Registro' : 'Ver Registro de Dictadores'}
        </button>

        <button
          style={{ backgroundColor: '#2ecc40', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => navigate('/dictador/personal')}
        >
          Ver Perfil Personal
        </button>
      </div>

      {/* Renderiza el registro de dictadores si showLog es true */}
      {showLog && (
        <DictadorLog dictadores={dictadores} />
      )}
    </div>
  );
};

export default Dictators;