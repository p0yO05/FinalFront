import React, { useState } from 'react';
import { createBattle } from '../../service/battleservice'; // Asegúrate de tener esta función en api.ts
import { Esclavo } from '../../types/types';
import { Navigate } from 'react-router-dom';

interface CreateBattleProps {   //este es CON LOG IN
  slaves: Esclavo[];
  organizerId: string;
}

const CreateCombat: React.FC<CreateBattleProps> = ({ slaves, organizerId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contestant1, setContestant1] = useState('');
  const [contestant2, setContestant2] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contestant1 === contestant2) {
      setMessage('Los concursantes deben ser distintos.');
      return;
    }

    // Lógica simple para simular resultado de combate
    const winnerId = Math.random() < 0.5 ? contestant1 : contestant2;
    const deathOccurred = Math.random() < 0.5;
    const betrayal = Math.random() < 0.3;
    const escape = Math.random() < 0.2;
    const kills = deathOccurred ? 1 : 0;
    const injuries = deathOccurred ? 'Heridas fatales' : 'Contusiones menores';
    const success = true;

    const newBattle = {
      name,
      description,
      organizerId,
      contestant_1_id: contestant1,
      contestant_2_id: contestant2,
      winner_id: winnerId,
      death_occurred: deathOccurred,
      betrayal_occurred: betrayal,
      miraculous_escape: escape,
      kills,
      injuries,
      success,
    };

    try {
      await createBattle(newBattle);
      setMessage('¡Batalla creada, A Luchar!');
      setName('');
      setDescription('');
      setContestant1('');
      setContestant2('');
      Navigate
    } catch (err) {
      console.error(err);
      setMessage('Error al crear la batalla.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear nueva batalla</h3>

      <label>Nombre:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <br />

      <label>Descripción:</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />

      <br />

      <label>Concursante 1:</label>
      <select value={contestant1} onChange={(e) => setContestant1(e.target.value)} required>
        <option value="">Selecciona un esclavo</option>
        {slaves.map((s) => (
          <option key={s.id} value={s.id}>
            {s.nickname} ({s.name})
          </option>
        ))}
      </select>

      <br />

      <label>Concursante 2:</label>
      <select value={contestant2} onChange={(e) => setContestant2(e.target.value)} required>
        <option value="">Selecciona un esclavo</option>
        {slaves.map((s) => (
          <option key={s.id} value={s.id}>
            {s.nickname} ({s.name})
          </option>
        ))}
      </select>

      <br />
      <button type="submit">Crear Batalla</button>
      <p>{message}</p>
    </form>
  );
};

export default CreateCombat;
