// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';

// Páginas (temporales, sin contenido real aún)
function BomberosPage() {
  return <div>🚧 Módulo de Bomberos</div>;
}

function AsistenciaPage() {
  return <div>📅 Módulo de Asistencia</div>;
}

function LicenciasPage() {
  return <div>📆 Módulo de Licencias</div>;
}

function ReportesPage() {
  return <div>📈 Módulo de Reportes</div>;
}

function AdminPage() {
  return <div>⚙️ Administración de Usuarios</div>;
}

// Proteger rutas
function ProtectedRoute({ children, allowed }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/" />;
  if (!allowed.includes(user.rol)) return <div>Acceso denegado</div>;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta pública: Login */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowed={['admin', 'operador', 'ayudante']}>
                <Dashboard title="Dashboard">
                  <p>Seleccioná una opción del menú.</p>
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/bomberos"
            element={
              <ProtectedRoute allowed={['admin', 'operador']}>
                <Dashboard title="Bomberos">
                  <BomberosPage />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/asistencia"
            element={
              <ProtectedRoute allowed={['admin', 'operador']}>
                <Dashboard title="Asistencia">
                  <AsistenciaPage />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/licencias"
            element={
              <ProtectedRoute allowed={['admin', 'ayudante']}>
                <Dashboard title="Licencias">
                  <LicenciasPage />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reportes"
            element={
              <ProtectedRoute allowed={['admin', 'operador', 'ayudante']}>
                <Dashboard title="Reportes">
                  <ReportesPage />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowed={['admin']}>
                <Dashboard title="Administración">
                  <AdminPage />
                </Dashboard>
              </ProtectedRoute>
            }
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;