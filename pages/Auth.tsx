import React, { useState } from 'react';
import { UserRole, ServiceCategory } from '../types';
import { useNavigate } from 'react-router-dom';
import { Briefcase, User as UserIcon } from 'lucide-react';

interface AuthProps {
  onLogin: (role: UserRole, name: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CLIENT);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin(selectedRole, name || 'Usuario');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          {isRegister ? 'Crea tu cuenta' : 'Inicia Sesión'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Bienvenido a ListoYa
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSelectedRole(UserRole.CLIENT)}
              className={`flex flex-col items-center p-4 border rounded-xl transition-all ${selectedRole === UserRole.CLIENT
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-500'
                }`}
            >
              <UserIcon size={24} className="mb-2" />
              <span className="text-sm font-medium">Soy Cliente</span>
              <span className="text-xs opacity-75">Busco servicios</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole(UserRole.PROVIDER)}
              className={`flex flex-col items-center p-4 border rounded-xl transition-all ${selectedRole === UserRole.PROVIDER
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-500'
                }`}
            >
              <Briefcase size={24} className="mb-2" />
              <span className="text-sm font-medium">Soy Profesional</span>
              <span className="text-xs opacity-75">Ofrezco servicios</span>
            </button>
          </div>

          {isRegister && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre Completo
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Correo Electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {isRegister ? 'Registrarse' : 'Ingresar'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          {' '}
          <button onClick={() => setIsRegister(!isRegister)} className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
            {isRegister ? 'Inicia sesión aquí' : 'Regístrate ahora'}
          </button>
        </p>
      </div>
    </div>
  );
};
