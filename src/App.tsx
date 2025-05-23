import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu/Menu'; // Menú de navegación
import Home from './Pages/Home';
import Contestants from './Pages/Contestants'; // Página protegida (antes "Contestants")
import Battles from './Pages/Battles';
import Dictators from './Pages/Dictadors';
import Market from './Pages/BlackMarket';
// import Login from './components/Login/MainLogin';
import PrivateRoute from './components/privateroute'; // Ruta protegida
import Logo from './components/Shared/logo'; // Import the Logo component
import './styles/darktheme.css'; // Import the dark theme CSS

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Estado de autenticación
  const [role, setRole] = useState<string | null>(null); // Estado del rol
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:5432/api/data') // Update the port here
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const handleLoginSuccess = (role: string) => {
    setIsAuthenticated(true);
    setRole(role);
  };

  return (
    <Router>
      {/* Muestra el menú solo si el usuario está autenticado */}
      {isAuthenticated && <Menu onLogout={() => setIsAuthenticated(false)} role={role} />}
      <main style={{ padding: '20px', minHeight: '80vh' }}>
        {isAuthenticated && <Logo />} {/* Display the logo if authenticated */}
        {data ? <p>{data.message}</p> : <p>Cargando Imperio...</p>}
        <Routes>
  {/* Página pública: Login */}
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Home />} />} />

          {/* Páginas protegidas */}
          <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Home />} />} />
          <Route path="/esclavos" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Contestants />} />} />
          <Route path="/battles" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Battles />} />} />
          <Route path="/dictators" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dictators />} />} />
          <Route path="/market" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Market />} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;