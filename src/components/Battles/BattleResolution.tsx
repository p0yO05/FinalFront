import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import amerikano from "../../images/Amerikano.png";
import elAtrocidade from "../../images/El Atrocidade.png";
import goblino from "../../images/Goblino.png";
import ogrro from "../../images/Ogrro.png";
import { generateBattleNarration } from "../../utils/BattleAI";

const portraits = [amerikano, elAtrocidade, goblino, ogrro];

const getTwoRandomImages = (): [string, string] => {
  const shuffled = [...portraits].sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
};

const mockBattle = {
  contestant_1: {
    id: 1,
    nickname: "Amerikano",
    name: "Amerikano",
    image: amerikano,
  },
  contestant_2: {
    id: 2,
    nickname: "El Atrocidade",
    name: "El Atrocidade",
    image: elAtrocidade,
  },
  narration: [
    "Amerikano lanza un poderoso golpe.",
    "El Atrocidade esquiva ágilmente y contraataca.",
    "La batalla se intensifica con cada movimiento.",
    "Finalmente, Amerikano logra la victoria.",
  ],
  winner: {
    id: 1,
    nickname: "Amerikano",
    name: "Amerikano",
  },
  winner_id: 1,
};

const BattleResolution: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const battle = state?.battle || mockBattle; // Use mock data if no battle is provided

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  if (!battle) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
        <p style={{ color: "#f87171", textAlign: "center" }}>
          No se encontró información de la batalla.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const contestant1 = battle.contestant_1 || { nickname: "Combatiente 1" };
  const contestant2 = battle.contestant_2 || { nickname: "Combatiente 2" };

  const narrationLines: string[] =
    Array.isArray(battle.narration) && battle.narration.length > 0
      ? battle.narration
      : generateBattleNarration(battle, contestant1, contestant2);

  const currentLine = narrationLines[currentLineIndex];

  const name1 = contestant1.nickname || "Combatiente 1";
  const name2 = contestant2.nickname || "Combatiente 2";
  const img1 = contestant1.image || getTwoRandomImages()[0];
  const img2 = contestant2.image || getTwoRandomImages()[1];

  let winner = battle.winner?.nickname || "Desconocido";
  if (!winner && battle.winner_id) {
    if (battle.contestant_1?.id === battle.winner_id) {
      winner = battle.contestant_1.nickname;
    } else if (battle.contestant_2?.id === battle.winner_id) {
      winner = battle.contestant_2.nickname;
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "white",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#2d2d2d",
          padding: "1rem",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignContent:"center", gap: "2rem", marginBottom: "1rem" }}>
          {[{ img: img1, name: name1 }, { img: img2, name: name2 }].map(({ img, name }, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <img
                src={img}
                alt={name}
                style={{
                  width: "6rem",
                  height: "6rem",
                  objectFit: "cover",
                  border: "3px solid #ff5722",
                }}
              />
              <p style={{ marginTop: "0.5rem", fontWeight: "bold", color: " #ff5722" }}>{name}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "1rem" }}>{currentLine}</p>
       {currentLineIndex === narrationLines.length - 1 && (
        <div style={{ fontSize: "1rem", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>
          {winner} ha ganado la batalla
        </div>
      )}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button
          onClick={() => setCurrentLineIndex((i) => Math.max(0, i - 1))}
          disabled={currentLineIndex === 0}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#444",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: currentLineIndex === 0 ? "not-allowed" : "pointer",
          }}
        >
          Anterior
        </button>
        <button
          onClick={() => setCurrentLineIndex((i) => Math.min(narrationLines.length - 1, i + 1))}
          disabled={currentLineIndex === narrationLines.length - 1}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor:"#ff5722",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: currentLineIndex === narrationLines.length - 1 ? "not-allowed" : "pointer",
          }}
          
        >
          Siguiente
        </button>
      </div>
      
      
      </div>


     
      {currentLineIndex === narrationLines.length - 1 && (
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#ff5722",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Volver al inicio
      </button>)
      }
    </div>
  );
};

export default BattleResolution;
