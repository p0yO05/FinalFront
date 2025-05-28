import React from "react";
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

const BattleResolution: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const battle = state?.battle;

  if (!battle) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-8 space-y-6 min-h-screen">
        <p className="text-red-500 text-center">No se encontró información de la batalla.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  // Concursantes
  const contestant1 = battle.contestant_1 || { nickname: "Combatiente 1", name: "Combatiente 1" };
  const contestant2 = battle.contestant_2 || { nickname: "Combatiente 2", name: "Combatiente 2" };

  // Narración
  const narrationLines: string[] =
    Array.isArray(battle.narration) && battle.narration.length > 0
      ? battle.narration
      : typeof battle.narration === "string" && battle.narration.trim() !== ""
      ? battle.narration
          .split(/\. (?=[A-Z])/g)
          .map((line: string) => line.trim())
          .filter((line: string) => line !== "")
          .map((line: string) => (line.endsWith(".") ? line : line + "."))
      : generateBattleNarration(battle, contestant1, contestant2);

  // Imágenes y nombres
  const img1 = battle?.contestant_1?.image || getTwoRandomImages()[0];
  const img2 = battle?.contestant_2?.image || getTwoRandomImages()[1];
  const name1 = contestant1.nickname || contestant1.name || "Combatiente 1";
  const name2 = contestant2.nickname || contestant2.name || "Combatiente 2";

  // Ganador: mostrar nickname si existe, si no, name, si no, "Desconocido"
  let winner = "Desconocido";
  if (battle?.winner) {
    // Si winner es un objeto con nickname, úsalo
    if (battle.winner.nickname) {
      winner = battle.winner.nickname;
    } else if (battle.winner.name) {
      winner = battle.winner.name;
    } else {
      winner = "Desconocido";
    }
  } else if (battle?.winner_id) {
    // Buscar el nickname del ganador por id si solo hay winner_id
    if (battle.contestant_1?.id === battle.winner_id) {
      winner = battle.contestant_1.nickname || battle.contestant_1.name || "Desconocido";
    } else if (battle.contestant_2?.id === battle.winner_id) {
      winner = battle.contestant_2.nickname || battle.contestant_2.name || "Desconocido";
    }
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 space-y-6 min-h-screen">
      {narrationLines.length > 0 ? (
        narrationLines.map((text: string, idx: number) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-gray-800 text-white rounded-lg p-4 shadow-md w-full max-w-3xl mb-6"
          >
            <div className="flex justify-center items-end gap-16 mb-2 w-full">
              <div className="flex flex-col items-center justify-center flex-1">
                <img
                  src={img1}
                  alt={name1}
                  className="w-32 h-32 object-cover rounded shadow-xl border-4 border-indigo-600"
                  style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                />
                <span
                  className="mt-2 text-lg font-extrabold text-indigo-100 text-center tracking-wide"
                  style={{ fontFamily: "'Segoe UI', 'Roboto', 'Arial Black', Arial, sans-serif" }}
                >
                  {name1}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center flex-1">
                <img
                  src={img2}
                  alt={name2}
                  className="w-32 h-32 object-cover rounded shadow-xl border-4 border-indigo-600"
                  style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                />
                <span
                  className="mt-2 text-lg font-extrabold text-indigo-100 text-center tracking-wide"
                  style={{ fontFamily: "'Segoe UI', 'Roboto', 'Arial Black', Arial, sans-serif" }}
                >
                  {name2}
                </span>
              </div>
            </div>
            <p className="text-center text-md px-4 flex-1">{text}</p>
          </div>
        ))
      ) : (
        <p className="text-red-500 text-center">⚠️ No hay eventos disponibles para esta batalla.</p>
      )}

      {/* Ganador */}
      <div className="text-xl font-bold text-green-400 text-center">
        🏆 {winner} ha ganado la batalla
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default BattleResolution;