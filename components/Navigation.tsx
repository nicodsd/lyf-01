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

  const isActive = (path: string) => currentPath === path ? 'text-blue-600' : 'text-gray-500';

  return (
    <div className="fixed bottom-4 w-[70%] mx-auto left-0 right-0 rounded-3xl bg-white border-t border-gray-400 py-2 px-6 flex justify-around items-center z-50 shadow-2xl pb-safe">
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
