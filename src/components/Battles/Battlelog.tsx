import React from 'react';
import { Battle } from '../../types/types';

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
            <strong>{new Date(battle.createdAt).toLocaleDateString()}</strong>
            <p> {battle.name} | <span style={{color:'blue'}}>{battle.contestant_1.nickname}</span> Vs <span style={{color:'red'}}>{battle.contestant_1.nickname}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BattleLog;
