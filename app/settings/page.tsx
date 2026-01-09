"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Navigation } from '@/components/Navigation';

export default function SettingsPage() {
    const { user, logout } = useApp();

    return (
        <div className="min-h-screen">
            <div className="p-8 pt-24">
                <h2 className="text-xl font-bold mb-6">Cuenta</h2>
                <button onClick={() => logout()} className="w-full py-3 text-red-600 font-semibold bg-red-50 rounded-xl">
                    Cerrar Sesión
                </button>
            </div>
            {user && <Navigation role={user.role} />}
        </div>
    );
}
