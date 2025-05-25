import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBattle } from '../../service/battleservice';
import { Esclavo, Estado } from '../../types/types';

interface CreateBattleProps {
  slaves: Esclavo[];
}

const CreateBattleHybrid: React.FC<CreateBattleProps> = ({ slaves }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contestant1, setContestant1] = useState('');
  const [contestant2, setContestant2] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    if (!contestant1 || !contestant2) return 'Selecciona ambos concursantes.';
    if (contestant1 === contestant2) return 'Un esclavo no puede pelear consigo mismo.';
    const c1 = slaves.find(s => s.id === contestant1);
    const c2 = slaves.find(s => s.id === contestant2);
    if (!c1 || !c2) return 'Concursantes inválidos.';
    if (c1.status !== Estado.Alive || c2.status !== Estado.Alive) return 'Solo esclavos vivos pueden pelear.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const error = validate();
    if (error) {
      setErrorMsg(error);
      return;
    }

    // Generación aleatoria del resultado del combate
    const winnerId = Math.random() < 0.5 ? contestant1 : contestant2;
    const deathOccurred = Math.random() < 0.5;
    const betrayal = Math.random() < 0.3;
    const escape = Math.random() < 0.2;
    const kills = deathOccurred ? 1 : 0;
    const injuries = deathOccurred ? 'Heridas fatales' : 'Contusiones menores';

    const battleData = {
      name,
      description,
      contestant_1_id: contestant1,
      contestant_2_id: contestant2,
      winner_id: winnerId,
      death_occurred: deathOccurred,
      betrayal_occurred: betrayal,
      miraculous_escape: escape,
      kills,
      injuries,
      success: true,
    };

    try {
      await createBattle(battleData);
      setSuccessMsg('¡Batalla creada exitosamente!');
      setTimeout(() => navigate('/battles'), 1500); // redirección tras éxito
    } catch (error: any) {
      setErrorMsg(error?.message || 'Error al crear la batalla.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#222', color: 'white', padding: 20, borderRadius: 8 }}>
      <h3>Crear nueva batalla</h3>

      <label>Nombre:</label>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 8 }}
      />

      <label>Descripción:</label>
      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ display: 'block', marginBottom: 8 }}
      />

      <label>Concursante 1:</label>
      <select
        value={contestant1}
        onChange={e => setContestant1(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 8 }}
      >
        <option value="">Selecciona un esclavo</option>
        {slaves.map(s => (
          <option
            key={s.id}
            value={s.id}
            disabled={s.status !== Estado.Alive || s.id === contestant2}
          >
            {s.nickname} ({s.name}) [{s.status}]
          </option>
        ))}
      </select>

      <label>Concursante 2:</label>
      <select
        value={contestant2}
        onChange={e => setContestant2(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 8 }}
      >
        <option value="">Selecciona un esclavo</option>
        {slaves.map(s => (
          <option
            key={s.id}
            value={s.id}
            disabled={s.status !== Estado.Alive || s.id === contestant1}
          >
            {s.nickname} ({s.name}) [{s.status}]
          </option>
        ))}
      </select>

      <button type="submit" style={{ marginTop: 12 }}>
        Crear Batalla
      </button>

      {errorMsg && <div style={{ color: 'red', marginTop: 8 }}>{errorMsg}</div>}
      {successMsg && <div style={{ color: 'lightgreen', marginTop: 8 }}>{successMsg}</div>}
    </form>
  );
};

export default CreateBattleHybrid;
