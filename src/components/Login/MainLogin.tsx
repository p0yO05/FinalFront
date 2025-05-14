import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../Shared/Button';
import { login } from '../../utils/auth';

interface LoginProps {
  onLoginSuccess: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [specialWord, setSpecialWord] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Ruta original a la que el usuario intentaba acceder
  const from = location.state?.from?.pathname || '/home';

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const handleLogin = () => {
    fetch('http://localhost:5432/dictadorlog/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: name, password }),
    })
      .then(response => response.json())
      .then((data) => {
        if (data.token) {
          login();
          onLoginSuccess(selectedRole!);
          navigate(from);
        } else {
          alert('Access denied. Only Dictadors are allowed.');
        }
      });
  };

  const handleRegister = () => {
    fetch('http://localhost:5432/dictadorlog/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email: name, password }),
    })
      .then(response => response.json())
      .then((data) => {
        if (data.id) {
          alert('Registration successful. Please log in.');
          setIsRegistering(false);
        } else {
          alert('Registration failed.');
        }
      });
  };

  const handleSpecialLogin = () => {
    fetch('http://localhost:5432/api/special-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: selectedRole, specialWord }),
    })
      .then(response => response.json())
      .then((data) => {
        if (data.message === 'Login successful') {
          login();
          onLoginSuccess(selectedRole!);
          navigate(from);
        } else {
          alert('Access denied. Invalid special word.');
        }
      });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#222',
      color: 'white',
    }}>
      <h1>Inicio de Sesión</h1>
      {!selectedRole ? (
        <>
          <p>Selecciona tu rol para continuar:</p>
          <Button
            label="Carolina SUPREME LEADER"
            onClick={() => handleRoleSelection('Carolina SUPREME LEADER')}
            style={{
              margin: '10px',
              backgroundColor: '#b71c1c',
              color: 'white',
            }}
          />
          <Button
            label="Dictador"
            onClick={() => handleRoleSelection('Dictador')}
            style={{
              margin: '10px',
              backgroundColor: '#1b5e20',
              color: 'white',
            }}
          />
        </>
      ) : selectedRole === 'Dictador' ? (
        <>
          <p>Introduce tu nombre y contraseña:</p>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
          />
          {isRegistering ? (
            <>
              <Button
                label="Registrar"
                onClick={handleRegister}
                style={{
                  margin: '10px',
                  backgroundColor: '#1b5e20',
                  color: 'white',
                }}
              />
              <Button
                label="Cancelar"
                onClick={() => setIsRegistering(false)}
                style={{
                  margin: '10px',
                  backgroundColor: '#b71c1c',
                  color: 'white',
                }}
              />
            </>
          ) : (
            <>
              <Button
                label="Iniciar Sesión"
                onClick={handleLogin}
                style={{
                  margin: '10px',
                  backgroundColor: '#1b5e20',
                  color: 'white',
                }}
              />
              <Button
                label="Registrar"
                onClick={() => setIsRegistering(true)}
                style={{
                  margin: '10px',
                  backgroundColor: '#b71c1c',
                  color: 'white',
                }}
              />
              <Button
                label="Volver"
                onClick={() => setSelectedRole(null)}
                style={{
                  margin: '10px',
                  backgroundColor: '#757575',
                  color: 'white',
                }}
              />
            </>
          )}
        </>
      ) : (
        <>
          <p>Introduce la palabra especial:</p>
          <input
            type="text"
            placeholder="Palabra Especial"
            value={specialWord}
            onChange={(e) => setSpecialWord(e.target.value)}
            style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
          />
          <Button
            label="Iniciar Sesión"
            onClick={handleSpecialLogin}
            style={{
              margin: '10px',
              backgroundColor: '#1b5e20',
              color: 'white',
            }}
          />
          <Button
            label="Volver"
            onClick={() => setSelectedRole(null)}
            style={{
              margin: '10px',
              backgroundColor: '#757575',
              color: 'white',
            }}
          />
        </>
      )}
    </div>
  );
};

export default Login;