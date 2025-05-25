import React from 'react';
import { Link } from 'react-router-dom';

interface MenuProps {
  onLogout: () => void; // Función para cerrar sesión
    role: string | null;
  
}

const Menu: React.FC<MenuProps> = ({ onLogout }) => {
  return (
    <nav style={{ backgroundColor: '#333', color: 'white', padding: '10px' }}>
      <ul style={{
        display: 'flex',
        listStyleType: 'none',
        gap: '20px',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
      }}>
        <li><Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>Inicio</Link></li>
        <li><Link to="/esclavos" style={{ textDecoration: 'none', color: 'white' }}>Esclavos</Link></li>
        <li><Link to="/battles" style={{ textDecoration: 'none', color: 'white' }}>Batallas</Link></li>
        <li><Link to="/dictadors" style={{ textDecoration: 'none', color: 'white' }}>Dictadores</Link></li>
        <li><Link to="/market" style={{ textDecoration: 'none', color: 'white' }}>Mercado Negro</Link></li>
        <li>
          <button
            onClick={onLogout}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: '#FF0000',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;