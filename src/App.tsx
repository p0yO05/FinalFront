import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu/Menu';
import Home from './Pages/Home';
import Contestants from './Pages/Esclavos';
import Battles from './Pages/Battles';
import CreateFight from './components/Battles/CreateBattle';
import CreateBattle from './components/Battles/BattleArena';
import BattleResolution from './components/Battles/BattleResolution';
import Dictators from './Pages/Dictadors';
import Market from './Pages/BlackMarket';
import Createtrade from './components/Blackmarket/Createrealoffers';
import Trading from './components/Blackmarket/trading';
import Receipt from './components/Blackmarket/Receipt';
import PrivateRoute from './components/privateroute';
import Logo from './components/Shared/logo';
import DictadorPersonalProfile from './components/Profile/Dictadorprofile';
import Spoted from './components/Login/Spoted'; // <-- Importa el componente épico
import './styles/darktheme.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <Router>
      {isAuthenticated && <Menu onLogout={() => setIsAuthenticated(false)} role={role} />}
      <main style={{ padding: '20px', minHeight: '80vh' }}>
        {isAuthenticated && <Logo />}
        {data ? <p>{data.message}</p> : <p>Cargando Imperio...</p>}
        <Routes>
          {/* Página principal protegida */}
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Home />} />} />

          {/* Páginas protegidas */}
          <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Home />} />} />
          <Route path="/esclavos" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Contestants />} />} />
          <Route path="/battles" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Battles />} />} />

          {/* Crear batalla (versión final recomendada) */}
          <Route path="/create-battle" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<CreateFight />} />} />

          {/* Otras rutas de pruebas o alternativas */}
          <Route path="/batalloso" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<CreateFight />} />} />
          <Route path="/Real" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<CreateBattle slaves={[]} organizerId={role || ''} />} />} />

          {/* Resolución de batalla */}
          <Route path="/battle-resolution" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<BattleResolution />} />} />

          {/* Dictadores y mercado */}
          <Route path="/dictadors" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dictators />} />} />
          <Route path="/dictador/personal" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<DictadorPersonalProfile />} />} />
          <Route path="/market" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Market />} />} />
          <Route path="/black-market" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Createtrade />} />} />
          <Route path="/trade" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Trading />} />} />
          <Route path="/receipt" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Receipt />} />} />

          {/* Ruta épica de descubierto */}
          <Route path="/descubierto" element={<Spoted />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;