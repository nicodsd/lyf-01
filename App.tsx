import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Explore } from './pages/Explore';
import { ProviderDetail } from './pages/ProviderDetail';
import { Notifications } from './pages/Notifications';
import { Navigation } from './components/Navigation';
import { UserRole, User, AppNotification } from './types';

// Moved ProtectedRoute outside to avoid re-creation on render and fix type inference issues
interface ProtectedRouteProps {
  user: User | null;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'n0',
      title: '¡Bienvenido a ServiConnect!',
      message: 'Explora y conecta con los mejores profesionales de tu zona.',
      type: 'info',
      timestamp: Date.now(),
      read: false
    }
  ]);

  const handleLogin = (role: UserRole, name: string) => {
    setUser({
      id: 'u1',
      name: name,
      email: 'user@example.com',
      role: role
    });
  };

  const addNotification = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      type,
      timestamp: Date.now(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handlePaymentSuccess = (providerName: string, amount: string) => {
    addNotification(
      'Pago Realizado con Éxito',
      `Has pagado $${amount} a ${providerName} por sus servicios. Se ha enviado una notificación al profesional.`,
      'success'
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-2xl overflow-hidden relative">
        <Routes>
          <Route path="/login" element={<Auth onLogin={handleLogin} />} />
          
          <Route path="/" element={
            <ProtectedRoute user={user}>
              {user?.role === UserRole.PROVIDER ? (
                // Provider Dashboard Placeholder
                <div className="p-8 text-center pt-24">
                  <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}</h1>
                  <div className="bg-white p-6 rounded-xl shadow-sm mb-4">
                    <p className="text-gray-600 mb-4">Tu perfil está activo. Los clientes pueden contactarte vía WhatsApp.</p>
                    <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
                    <p className="text-sm text-gray-500">Calificación Promedio</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg mb-2">Solicitudes Recientes</h3>
                    <p className="text-gray-500 text-sm">No tienes nuevas solicitudes en este momento.</p>
                  </div>
                </div>
              ) : (
                <Navigate to="/explore" replace />
              )}
            </ProtectedRoute>
          } />

          <Route path="/explore" element={
            <ProtectedRoute user={user}>
              <Explore notificationCount={unreadCount} />
            </ProtectedRoute>
          } />

          <Route path="/provider/:id" element={
            <ProtectedRoute user={user}>
              <ProviderDetail onPaymentSuccess={handlePaymentSuccess} />
            </ProtectedRoute>
          } />

          <Route path="/notifications" element={
            <ProtectedRoute user={user}>
               <Notifications notifications={notifications} />
            </ProtectedRoute>
          } />

           <Route path="/my-profile" element={
            <ProtectedRoute user={user}>
               <div className="p-8 text-center pt-24">
                  <h2 className="text-xl font-bold">Mi Perfil</h2>
                  <p className="text-gray-500 mt-2">Esta sección permitiría editar tu información, subir certificados y ver estadísticas.</p>
               </div>
            </ProtectedRoute>
          } />

           <Route path="/settings" element={
            <ProtectedRoute user={user}>
               <div className="p-8 pt-24">
                  <h2 className="text-xl font-bold mb-6">Cuenta</h2>
                  <button onClick={() => setUser(null)} className="w-full py-3 text-red-600 font-semibold bg-red-50 rounded-xl">
                    Cerrar Sesión
                  </button>
               </div>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
        </Routes>

        {user && <Navigation role={user.role} />}
      </div>
    </HashRouter>
  );
}