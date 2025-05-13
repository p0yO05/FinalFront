import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, style }) => (
  <button onClick={onClick} style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', ...style }}>
    {label}
  </button>
);

export default Button;