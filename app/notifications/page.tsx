"use client";

import React from 'react';
import { ArrowLeft, Bell, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function NotificationsPage() {
    const { notifications } = useApp();
    const router = useRouter();

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle size={20} className="text-green-500" />;
            case 'warning': return <AlertCircle size={20} className="text-yellow-500" />;
            default: return <Info size={20} className="text-blue-500" />;
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="pb-24 bg-gray-50 min-h-screen">
            <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={20} className="text-gray-700" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Notificaciones</h1>
            </div>

            <div className="p-4 space-y-3">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Bell size={48} className="mb-4 opacity-20" />
                        <p>No tienes notificaciones nuevas</p>
                    </div>
                ) : (
                    notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-3 ${!notif.read ? 'border-l-4 border-l-blue-500' : ''}`}
                        >
                            <div className="flex-shrink-0 mt-1">
                                {getIcon(notif.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-900 text-sm">{notif.title}</h3>
                                    <span className="text-xs text-gray-400">{formatDate(notif.timestamp)}</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                    {notif.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
