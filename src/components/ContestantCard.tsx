import React from 'react';

interface ContestantCardProps {
  name: string;
  nickname: string;
  status: string;
  wins: number;
  losses: number;
}

const ContestantCard: React.FC<ContestantCardProps> = ({ name, nickname, status, wins, losses }) => {
  return (
    <div style={{
      border: '1px solid gray',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#444',
      color: 'white',
      maxWidth: '250px'
    }}>
      <h2>{nickname} ({name})</h2>
      <p><strong>Estado:</strong> {status}</p>
      <p><strong>Victorias:</strong> {wins}</p>
      <p><strong>Derrotas:</strong> {losses}</p>
    </div>
  );
};

export default ContestantCard;