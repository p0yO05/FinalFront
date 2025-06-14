import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBattles } from '../service/battleservice';
import BattleLog from '../components/Battles/Battlelog';
import { Battle } from '../types/types';
import SponsorLog from '../components/Sponsors/sponsorlog';
import CreateBattle from '../components/Battles/CreateBattle';
import BattleResolution from '../components/Battles/BattleResolution';
const Battles: React.FC = () => {
  const navigate = useNavigate();
  const [showLog, setShowLog] = useState(false);
  const [showSponsors, setShowSponsors] = useState(false);
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateBattle, setShowCreateBattle] = useState(false);
  const fetchBattles = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getBattles();
      setBattles(data);
      console.log(data)
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

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
      <h1 style={{ marginBottom: '20px' }}>Batallas</h1>
      <p>Registra y consulta los enfrentamientos entre tus concursantes.</p>

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowCreateBattle(!showCreateBattle)}
        >
          Crear Batalla
        </button>
        
        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowLog(!showLog)}
        >
          {showLog ? 'Ocultar Registro' : 'Ver Registro de Batallas'}
        </button>

        <button
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          onClick={() => setShowSponsors(!showSponsors)}
        >
          {showSponsors ? 'Ocultar Sponsors' : 'Ver Sponsors'}
        </button>
      </div>
      {showCreateBattle && <CreateBattle/>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <div>Cargando batallas...</div>}

      {showLog && !loading && <BattleLog battles={battles} />}
      {showSponsors && <SponsorLog />}
    </div>
  );
};

export default Battles;