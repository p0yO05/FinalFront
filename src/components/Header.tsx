import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header style={{ backgroundColor: '#333', padding: '10px', color: 'white' }}>
      <h1>Lucha por tu Libertad o Muere!</h1>
      <nav>
        <ul style={{ display: 'flex', gap: '15px', listStyle: 'none' }}>
          <li><Link to="/" style={{ color: 'white' }}>Inicio</Link></li>
          <li><Link to="/contestants" style={{ color: 'white' }}>Esclavos</Link></li>
          <li><Link to="/battles" style={{ color: 'white' }}>Batallas</Link></li>
          <li><Link to="/dictators" style={{ color: 'white' }}>Dictadores</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;