import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Slave {
  id: string;
  name: string;
}

const CreateBattle: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contestant1, setContestant1] = useState("");
  const [contestant2, setContestant2] = useState("");
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const navigate = useNavigate();

  // 🔄 Obtener esclavos
  useEffect(() => {
    const fetchSlaves = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/esclavos");
        setSlaves(response.data);
      } catch (error) {
        console.error("Error al obtener esclavos:", error);
      }
    };
    fetchSlaves();
  }, []);

  // ⚔️ Enviar solo el JSON y solicitar la batalla completa después
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🚨 Validaciones básicas
    if (!contestant1 || !contestant2) {
      alert("Selecciona dos concursantes.");
      return;
    }

    if (contestant1 === contestant2) {
      alert("Los concursantes deben ser diferentes.");
      return;
    }

    const organizerId = "fe361c19-45d7-4c4c-9527-ec7ec262a9b8"; // 🏛️ ID fijo del dictador existente

    // 📤 Crear JSON inicial para enviar al backend
    const payload = {
      name,
      description,
      organizerId,
      contestant_1_id: contestant1,
      contestant_2_id: contestant2
    };

    try {
      const response = await axios.post("http://localhost:3000/api/battles", payload);
      const battleInfo = response.data; // 🔥 El backend aún no ha calculado los eventos

      console.log("JSON de batalla enviado al backend:", battleInfo);

      // ⏳ Esperar unos segundos antes de solicitar la batalla con los eventos generados
      setTimeout(async () => {
        try {
          const finalBattleResponse = await axios.get(`http://localhost:3000/api/battles/${battleInfo.id}`);
          const finalBattle = finalBattleResponse.data;

          console.log("Batalla final generada con eventos:", finalBattle);

          // 🚀 Redirigir a `BattleResolution.tsx` con la batalla ya procesada
          navigate("/battle-resolution", { state: { battle: finalBattle } });

        } catch (error) {
          console.error("Error al obtener la batalla completa:", error);
          alert("Error al obtener la batalla con eventos generados.");
        }
      }, 3000); // Se espera 3 segundos antes de pedir los datos completos

    } catch (error: any) {
      console.error("Error al enviar batalla inicial:", error);
      alert(error.response?.data?.message || "Error al enviar la batalla inicial");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
      <h2>Formulario de Batallas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <select
          value={contestant1}
          onChange={(e) => setContestant1(e.target.value)}
          required
        >
          <option value="">Esclavo 1</option>
          {slaves.map((slave) => (
            <option key={slave.id} value={slave.id}>
              {slave.name}
            </option>
          ))}
        </select>
        <select
          value={contestant2}
          onChange={(e) => setContestant2(e.target.value)}
          required
        >
          <option value="">Esclavo 2</option>
          {slaves.map((slave) => (
            <option key={slave.id} value={slave.id}>
              {slave.name}
            </option>
          ))}
       </select>
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          style={{ gridColumn: '1 / 3' }}
        />
        <textarea
          placeholder="Descripcion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ gridColumn: '1 / 3', height: '100px' }}
        />

       <button
          type="submit"
          style={{ backgroundColor: '#444', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', gridColumn: '1 / 3' }}
        >
          Agregar Batalla 
        </button>
      </div>
    </form>
  );
};

export default CreateBattle;