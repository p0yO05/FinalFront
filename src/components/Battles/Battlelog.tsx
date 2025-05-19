import React from 'react';
import { Battle } from '../../types/types';
import { generateBattleNarration } from '../../utils/BattleAI';
interface BattleLogProps {
  battles: Battle[];
}

const BattleLog: React.FC<BattleLogProps> = ({ battles }) => {
  return (
    <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
      <h2>Registro de Batallas</h2>
      <ul>
        {battles.map((battle) => (
          <li key={battle.id} style={{ marginBottom: '15px' }}>
            <strong>{battle.date}</strong>
            <p>{generateBattleNarration(battle, battle.contestant1, battle.contestant2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BattleLog;
