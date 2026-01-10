"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, AppNotification } from '@/types';
import { useRouter } from 'next/navigation';

interface AppContextType {
    user: User | null;
    notifications: AppNotification[];
    login: (role: UserRole, name: string) => void;
    logout: () => void;
    addNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
    unreadCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
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

    const login = (role: UserRole, name: string) => {
        setUser({
            id: 'u1',
            name: name,
            email: 'user@example.com',
            role: role
        });
    };

    const logout = () => {
        setUser(null);
        router.push('/');
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

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <AppContext.Provider value={{ user, notifications, login, logout, addNotification, unreadCount }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
