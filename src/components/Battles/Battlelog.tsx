import React from 'react';

interface BattleLogProps {
  battles: {
    id: string;
    contestant1: string;
    contestant2: string;
    winner: string;
    date: string;
  }[];
}

const BattleLog: React.FC<BattleLogProps> = ({ battles }) => {
  return (
    <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
      <h2>Registro de Batallas</h2>
      <ul>
        {battles.map((battle) => (
          <li key={battle.id} style={{ marginBottom: '10px' }}>
            <strong>{battle.date}:</strong> {battle.contestant1} vs {battle.contestant2} - <em>{battle.winner ? `Ganador: ${battle.winner}` : 'Sin resultado'}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BattleLog;