import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RotaProtegida from './componentes/RotaProtegida';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<Login />} />

        {/* Rotas Protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <RotaProtegida>
              <Dashboard />
            </RotaProtegida>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;