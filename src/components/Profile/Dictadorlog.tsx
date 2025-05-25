import React from 'react';

interface Dictador {
  id: string;
  name: string;
  territory: string;
  loyalty_to_Carolina: number;
  esclavos: any[];
  createdAt?: string;
}

interface DictadorLogProps {
  dictadores: Dictador[];
}

const getLealtadColor = (lealtad: number) => {
  if (lealtad >= 80) return 'limegreen';
  if (lealtad >= 50) return 'gold';
  if (lealtad >= 20) return 'orange';
  return 'red';
};

const DictadorLog: React.FC<DictadorLogProps> = ({ dictadores }) => {
  return (
    <div style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
      <h2>Registro de Dictadores</h2>
      <ul>
        {dictadores.map((dictador) => (
          <li key={dictador.id} style={{ marginBottom: '15px' }}>
            <strong>
              {dictador.createdAt
                ? new Date(dictador.createdAt).toLocaleDateString()
                : ''}
            </strong>
            <p>
              <span style={{ color: 'gold' }}>{dictador.name}</span> | Territorio: <span style={{ color: 'lightblue' }}>{dictador.territory}</span> | Lealtad: <span style={{ color: getLealtadColor(dictador.loyalty_to_Carolina), fontWeight: 'bold' }}>{dictador.loyalty_to_Carolina}%</span> | Esclavos: <span style={{ color: 'orange' }}>{dictador.esclavos ? dictador.esclavos.length : 0}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DictadorLog;