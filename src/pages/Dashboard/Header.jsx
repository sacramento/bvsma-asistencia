// src/pages/Dashboard/Header.jsx
import './Header.css';

export default function Header({ title }) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <div className="header-user">
          <div className="header-user-avatar">U</div>
          <span>Bienvenido</span>
        </div>
      </div>
    </header>
  );
}