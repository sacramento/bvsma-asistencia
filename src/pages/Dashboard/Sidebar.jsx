// src/pages/Dashboard/Sidebar.jsx
import './Sidebar.css';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Opciones del menú por rol
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { 
      name: 'Bomberos', 
      path: '/bomberos', 
      icon: '👨‍🚒',
      visible: ['admin', 'operador'].includes(user?.rol)
    },
    { 
      name: 'Asistencia', 
      path: '/asistencia', 
      icon: '📝',
      visible: ['admin', 'operador'].includes(user?.rol)
    },
    { 
      name: 'Licencias', 
      path: '/licencias', 
      icon: '📅',
      visible: ['admin', 'ayudante'].includes(user?.rol)
    },
    { 
      name: 'Reportes', 
      path: '/reportes', 
      icon: '📈',
      visible: !!user?.rol // Todos los usuarios autenticados
    },
    { 
      name: 'Administración', 
      path: '/admin', 
      icon: '⚙️',
      visible: user?.rol === 'admin'
    }
  ];

  const filteredItems = menuItems.filter(item => item.visible !== false);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img 
          src="/assets/images/logo-bvsma.png" 
          alt="Logo BVSMA" 
          className="sidebar-logo-img"
        />
        <span className="sidebar-logo-text">BVSMA</span>
      </div>

      {/* Navegación */}
      <nav className="sidebar-nav">
        {filteredItems.map((item) => (
          <div
            key={item.path}
            className={`sidebar-item ${window.location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            {item.name}
          </div>
        ))}
      </nav>

      {/* Footer con logout */}
      <div className="sidebar-footer">
        <div>
          <p>{user?.nombre} {user?.apellido}</p>
          <p className="text-bombero-red text-xs font-medium">{user?.rol}</p>
        </div>
        <button 
          onClick={logout}
          className="btn btn-red btn-sm w-full mt-2"
        >
          Salir
        </button>
      </div>
    </aside>
  );
}