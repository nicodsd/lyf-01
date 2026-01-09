"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Navigation } from '@/components/Navigation';

export default function MyProfilePage() {
    const { user } = useApp();

    return (
        <div className="min-h-screen">
            <div className="p-8 text-center pt-24">
                <h2 className="text-xl font-bold">Mi Perfil</h2>
                <p className="text-gray-500 mt-2">Esta sección permitiría editar tu información, subir certificados y ver estadísticas.</p>
            </div>
            {user && <Navigation role={user.role} />}
        </div>
    );
}
