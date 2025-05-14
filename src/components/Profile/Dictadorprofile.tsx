import React from 'react';

interface DictatorProfileProps {
  name: string;
  territory: string;
  slaves: number;
  loyalty: number;
}

const DictatorProfile: React.FC<DictatorProfileProps> = ({ name, territory, slaves, loyalty }) => {
  return (
    <div style={{
      border: '1px solid gray',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: '#222',
      color: 'white'
    }}>
      <h2>{name}</h2>
      <p><strong>Territorio:</strong> {territory}</p>
      <p><strong>Esclavos:</strong> {slaves}</p>
      <p><strong>Lealtad:</strong> {loyalty}%</p>
    </div>
  );
};

export default DictatorProfile;