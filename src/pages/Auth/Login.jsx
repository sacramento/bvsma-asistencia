// src/pages/Auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [legajo, setLegajo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legajo, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en autenticación');
      }

      // Guardar usuario y redirigir
      localStorage.setItem('bvsma_user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="flex items-center justify-center mb-2">
            <img 
              src="/assets/images/logo-bvsma.png" 
              alt="Logo BVSMA" 
              className="login-logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = '<span className="text-white font-bold text-lg">BVSMA</span>';
              }}
            />
          </div>
          <h1 className="login-title">Bomberos Voluntarios</h1>
          <p className="login-subtitle">San Martín de los Andes</p>
        </div>

        <div className="login-form">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="legajo" className="login-label">
                Legajo
              </label>
              <input
                type="text"
                id="legajo"
                value={legajo}
                onChange={(e) => setLegajo(e.target.value)}
                className="login-input"
                placeholder="Ej: SM001"
                disabled={loading}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="password" className="login-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="********"
                disabled={loading}
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="login-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="login-btn"
            >
              {loading && <svg className="login-spinner" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>

        <div className="login-footer">
          <p className="login-footer-text">
            Sistema de Asistencia para Capacitaciones • BVSMA
          </p>
        </div>
      </div>
    </div>
  );
}