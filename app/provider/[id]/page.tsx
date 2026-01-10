"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { StarRating } from '@/components/StarRating';
import { generateSmartMessage } from '@/services/geminiService';
import { ArrowLeft, MapPin, Award, User, MessageCircle, Sparkles, Send, MessageCircleMore, Phone } from 'lucide-react';
import RatingStars from '@/components/RatingStarsAction';
import FacebookComments from '@/components/FacebookComments';
import { MOCK_PROVIDERS } from '@/data/mockProviders';
import Image from 'next/image';

export default function ProviderDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    // Handle array or string param (Next.js params can be array for catch-all)
    const providerId = Array.isArray(id) ? id[0] : id;
    const provider = MOCK_PROVIDERS.find(p => p.id === providerId);

    const [showContactModal, setShowContactModal] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [userIssue, setUserIssue] = useState('');
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [windowUrl, setWindowUrl] = useState('');

    console.log(provider?.photoUrl);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowUrl(window.location.href);
        }
    }, []);

    useEffect(() => {
        if (provider) {
            setGeneratedMessage(`Hola ${provider.name}, te hablo desde ListoYa y estoy interesado en contratar tu servicio de ${provider.category}. ¿Podrías darme más información sobre tu trabajo?`);
        }
    }, [provider]);

    if (!provider) return <div className="p-8 text-center">Proveedor no encontrado</div>;

    const handleGenerateMessage = async () => {
        if (!userIssue) return;
        setIsGenerating(true);
        try {
            const smartMsg = await generateSmartMessage(provider.name, provider.category, userIssue);
            setGeneratedMessage(smartMsg);
        } catch (e) {
            console.error("Error generating message", e);
        }
        setIsGenerating(false);
    };

    const openWhatsApp = () => {
        const encodedMessage = encodeURIComponent(generatedMessage);
        window.open(`https://wa.me/${provider.phone}?text=${encodedMessage}`, '_blank');
        setShowContactModal(false);
    };

    return (
        <div className="min-h-screen mx-auto max-w-4xl pb-10">
            {/* Header Image */}
            <div className="sticky top-0 h-64 rounded-b-lg overflow-hidden sm:rounded-lg sm:mt-4 sm:mx-4 shadow-lg">
                <Image src={provider.photoUrl} alt={provider.name} width={200} height={200} loading="lazy" className="w-full h-full object-cover" />
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-md backdrop-blur-sm"
                >
                    <ArrowLeft size={20} className="text-gray-800" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
                    <h1 className="text-white text-3xl font-bold">{provider.name}</h1>
                    <p className="text-white/90 text-lg">{provider.category}</p>
                    <div className="text-white/90 flex items-center gap-1">
                        <MapPin size={14} /> {provider.location}
                    </div>
                </div>
            </div>

            {/* Main Info */}
            <div className="px-6 py-6 bg-gray-50 space-y-6 sm:mx-4 sm:rounded-b-lg">
                {/* Stats Row */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-gray-900">{provider.rating}</span>
                            <div className="flex flex-col">
                                <StarRating rating={provider.rating} size={14} />
                                <span className="text-xs text-gray-500">{provider.reviewCount} reseñas</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 flex items-center justify-end gap-1 mt-1">
                            <User size={14} /> {provider.age} años • {provider.gender}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center justify-end gap-1 mt-1">
                            <Phone size={14} /> {provider.phone}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Sobre mí</h2>
                    <p className="text-gray-600 leading-relaxed text-md">{provider.description}</p>
                </div>

                {/* Certifications */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Títulos y Cursos</h2>
                    <div className="space-y-3">
                        {provider.certifications.length > 0 ? (
                            provider.certifications.map(cert => (
                                <div key={cert.id} className="flex items-start bg-white p-3 rounded-lg border border-gray-200">
                                    <Award className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={26} />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-sm">{cert.title}</h4>
                                        <p className="text-xs text-gray-500">{cert.institution} • {cert.year}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic">No hay certificaciones listadas.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-white gap-3 border-t border-gray-200 flex flex-col sm:mx-4 sm:rounded-lg sm:mt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Contacta con {provider.name}</h3>
                <div className='flex gap-3'>
                    <button
                        onClick={() => setShowContactModal(true)}
                        className="flex-1 bg-white text-green-600 font-bold py-3.5 rounded-xl border-2 border-green-600 shadow-sm hover:bg-green-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <MessageCircle size={20} />
                        WhatsApp
                    </button>
                    <button
                        onClick={() => setShowChat(true)}
                        className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <MessageCircleMore size={20} />
                        Chat
                    </button>
                </div>

                {/* <div className="flex items-center flex-col mt-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Dejale una reseña</h3>
                    <RatingStars />
                    <textarea
                        placeholder="Escribe tu reseña..."
                        className="w-full p-3 border rounded-lg text-sm h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Enviar
                    </button>
                    {windowUrl && <FacebookComments url={windowUrl} appId="123456789" />}
                </div> */}

            </div>

            {/* Contact Modal */}
            {showContactModal && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white absolute top-60 mx-2 max-w-md rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MessageCircle className="text-green-600" />
                            Contactar por WhatsApp
                        </h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Describe tu problema (Opcional)</label>
                            <div className="relative">
                                <textarea
                                    className="w-full p-3 border rounded-lg text-sm h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej: Tengo una fuga de agua debajo del fregadero de la cocina..."
                                    value={userIssue}
                                    onChange={(e) => setUserIssue(e.target.value)}
                                />
                                <button
                                    onClick={handleGenerateMessage}
                                    disabled={!userIssue || isGenerating}
                                    className="absolute bottom-4 right-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md flex items-center gap-1 hover:bg-blue-200 disabled:opacity-50"
                                >
                                    <Sparkles size={12} />
                                    {isGenerating ? 'Generando...' : 'Mejorar con IA'}
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vista previa del mensaje</label>
                            <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 italic border border-gray-200">
                                "{generatedMessage}"
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowContactModal(false)}
                                className="flex-1 py-3 text-gray-600 font-semibold border border-gray-300 rounded-xl hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={openWhatsApp}
                                className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 flex justify-center items-center gap-2"
                            >
                                <Send size={18} />
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
