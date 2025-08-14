
import React from 'react';

type View = 'registros' | 'clientes' | 'portales';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const NavLink: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`block w-full text-left px-4 py-3 text-lg transition-colors duration-200 ${
      isActive
        ? 'bg-brand-primary text-brand-dark font-bold'
        : 'text-gray-200 hover:bg-brand-dark-accent hover:text-white'
    }`}
  >
    {label}
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="bg-brand-dark text-white w-64 min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-wider uppercase">
          Portal de Registros
        </h1>
      </div>
      <nav className="flex-grow pt-5">
        <NavLink
          label="Registros"
          isActive={currentView === 'registros'}
          onClick={() => onViewChange('registros')}
        />
        <NavLink
          label="Clientes"
          isActive={currentView === 'clientes'}
          onClick={() => onViewChange('clientes')}
        />
        <NavLink
          label="Portales"
          isActive={currentView === 'portales'}
          onClick={() => onViewChange('portales')}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
