"use client";

import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';

export default function HomePage() {
    const { user } = useApp();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (user.role === UserRole.CLIENT) {
            router.push('/explore');
        }
    }, [user, router]);

    if (!user) return null;

    if (user.role === UserRole.PROVIDER) {
        return (
            <main className="min-h-screen relative pb-20">
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
                <Navigation role={user.role} />
            </main>
        );
    }

    // Fallback for transition
    return null;
}
