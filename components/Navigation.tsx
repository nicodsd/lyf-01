import React from 'react';
import { Home, Search, User, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../types';

interface NavigationProps {
  role: UserRole;
}

export const Navigation: React.FC<NavigationProps> = ({ role }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path ? 'text-blue-600' : 'text-gray-400';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-50 shadow-lg pb-safe">
      <Link to="/" className={`flex flex-col items-center ${isActive('/')}`}>
        <Home size={24} />
        <span className="text-[10px] mt-1 font-medium">Inicio</span>
      </Link>
      
      {role === UserRole.CLIENT && (
        <Link to="/explore" className={`flex flex-col items-center ${isActive('/explore')}`}>
          <Search size={24} />
          <span className="text-[10px] mt-1 font-medium">Explorar</span>
        </Link>
      )}

      {role === UserRole.PROVIDER && (
        <Link to="/my-profile" className={`flex flex-col items-center ${isActive('/my-profile')}`}>
          <Briefcase size={24} />
          <span className="text-[10px] mt-1 font-medium">Mi Perfil</span>
        </Link>
      )}

      <Link to="/settings" className={`flex flex-col items-center ${isActive('/settings')}`}>
        <User size={24} />
        <span className="text-[10px] mt-1 font-medium">Cuenta</span>
      </Link>
    </div>
  );
};
