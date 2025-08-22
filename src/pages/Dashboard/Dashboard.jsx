// src/pages/Dashboard/Dashboard.jsx
import Sidebar from './Sidebar';
import Header from './Header';
import './Dashboard.css';

export default function Dashboard({ children, title }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 ml-64 min-h-screen bg-bombero-gray">
        <Header title={title} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}