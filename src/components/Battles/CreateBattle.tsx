// src/component/Battles/CreateBattle.tsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

// Definir la interfaz de respuesta esperada de la API
interface BattleResponse {
  id: string;
  name: string;
  description: string;
  organizerId: string;
}

const CreateBattle = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [organizerId, setOrganizerId] = useState(''); // Este debería venir del login
  const [contestants, setContestants] = useState<BattleResponse[]>([]);
  const [contestant1, setContestant1] = useState('');
  const [contestant2, setContestant2] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Fetch concursantes del backend
    const fetchContestants = async () => {
      try {
        const response = await api.get<BattleResponse[]>('/esclavos');
        setContestants(response.data);
      } catch (error) {
        console.error('Error al obtener concursantes:', error);
      }
    };
    fetchContestants();

    // Simulación de organizador si no tienes login aún
    setOrganizerId('YOUR_DICTADOR_ID_AQUI');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (contestant1 === contestant2) {
      setErrorMsg('Los concursantes deben ser distintos');
      return;
    }

    const battleData = {
      name,
      description,
      organizerId,
      contestant_1_id: contestant1,
      contestant_2_id: contestant2,
    };

    try {
      const response = await api.post<BattleResponse>('/battle', battleData);
      console.log('Batalla creada:', response.data);
      navigate(`/narrar-batalla/${response.data.id}`);
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || 'Error al crear batalla');
      console.error('Error al crear batalla:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Batalla</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del evento"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border"
          required
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border"
        />
        <select
          value={contestant1}
          onChange={(e) => setContestant1(e.target.value)}
          className="w-full p-2 border"
          required
        >
          <option value="">Selecciona el Primer Concursante</option>
          {contestants.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={contestant2}
          onChange={(e) => setContestant2(e.target.value)}
          className="w-full p-2 border"
          required
        >
          <option value="">Selecciona el Segundo Concursante</option>
          {contestants.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Iniciar Batalla
        </button>
      </form>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
    </div>
  );
};

export default CreateBattle;