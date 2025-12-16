import React, { useState, useEffect } from 'react';
import { ServiceCategory, ProviderProfile } from '../types';
import { StarRating } from '../components/StarRating';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, Bell } from 'lucide-react';
const MOCK_PROVIDERS: ProviderProfile[] = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    age: 34,
    gender: 'Hombre',
    category: ServiceCategory.PLOMERIA,
    location: 'Centro, Ciudad',
    photoUrl: 'https://picsum.photos/id/1005/150/150',
    rating: 4.8,
    reviewCount: 124,
    phone: '5551234567',
    description: 'Plomero especialista en reparaciones urgentes y mantenimiento residencial. 10 años de experiencia.',
    certifications: [
      { id: 'c1', title: 'Técnico en Hidráulica', institution: 'Instituto Técnico Nacional', year: '2015' }
    ]
  },
  {
    id: '2',
    name: 'Ana García',
    age: 29,
    gender: 'Mujer',
    category: ServiceCategory.ELECTRICIDAD,
    location: 'Norte, Ciudad',
    photoUrl: 'https://picsum.photos/id/1011/150/150',
    rating: 5.0,
    reviewCount: 45,
    phone: '5559876543',
    description: 'Electricista matriculada. Instalaciones completas, cableado y reparación de cortocircuitos.',
    certifications: [
      { id: 'c2', title: 'Certificación en Baja Tensión', institution: 'Cámara de Electricistas', year: '2018' },
      { id: 'c3', title: 'Seguridad Industrial', institution: 'Udemy', year: '2020' }
    ]
  },
  {
    id: '3',
    name: 'Miguel López',
    age: 45,
    gender: 'Hombre',
    category: ServiceCategory.CLIMATIZACION,
    location: 'Sur, Ciudad',
    photoUrl: 'https://picsum.photos/id/1012/150/150',
    rating: 4.5,
    reviewCount: 89,
    phone: '5551122334',
    description: 'Instalación y mantenimiento de aires acondicionados split y centrales. Carga de gas.',
    certifications: []
  },
  {
    id: '4',
    name: 'Lucía Fernández',
    age: 31,
    gender: 'Mujer',
    category: ServiceCategory.LIMPIEZA,
    location: 'Oeste, Ciudad',
    photoUrl: 'https://picsum.photos/id/1027/150/150',
    rating: 4.9,
    reviewCount: 210,
    phone: '5554433221',
    description: 'Servicio de limpieza profunda para hogares y oficinas. Detallista y confiable.',
    certifications: []
  },
  {
    id: '5',
    name: 'Jorge Martinez',
    age: 52,
    gender: 'Hombre',
    category: ServiceCategory.GAS,
    location: 'Centro, Ciudad',
    photoUrl: 'https://picsum.photos/id/1001/150/150',
    rating: 4.2,
    reviewCount: 30,
    phone: '5556677889',
    description: 'Gasista matriculado de primera categoría. Planos, habilitaciones y reparaciones.',
    certifications: [
      { id: 'c4', title: 'Matrícula Gasista 1ra', institution: 'MetroGas', year: '2010' }
    ]
  }
];
interface ExploreProps {
  notificationCount: number;
}
export const Explore: React.FC<ExploreProps> = ({ notificationCount }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'Todos'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProviders, setFilteredProviders] = useState(MOCK_PROVIDERS);
  const navigate = useNavigate();
  useEffect(() => {
    let result = MOCK_PROVIDERS;
    if (activeCategory !== 'Todos') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerTerm) ||
        p.description.toLowerCase().includes(lowerTerm)
      );
    }
    setFilteredProviders(result);
  }, [activeCategory, searchTerm]);
  return (
    <div className="pb-24 pt-4 px-4">
      {/* Header & Search */}
      <div className="mb-6 sticky top-0  z-10 pt-2 pb-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">ListoYa</h1>
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-200"
          >
            <Bell size={20} className="text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="¿Qué servicio necesitas hoy?"
            className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>
      </div>
      {/* Categories */}
      <div className="flex overflow-x-auto space-x-3 pb-4 mb-2 no-scrollbar">
        <button
          onClick={() => setActiveCategory('Todos')}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'Todos' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm border border-gray-100'
            }`}
        >
          Todos
        </button>
        {Object.values(ServiceCategory).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm border border-gray-100'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Results List */}
      <div className="space-y-2">
        {filteredProviders.map((provider) => (
          <Link to={`/provider/${provider.id}`} key={provider.id} className="block">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 transition-transform hover:scale-[1.01]">
              <div className="flex relative flex-col items-center">
                <div className="flex items-center h-10 flex-col px-2 py-1 rounded-md absolute bottom-0">
                  <span className="font-bold text-gray-700 ml-1">{provider.rating}</span>
                  <StarRating rating={provider.rating} size={10} />
                </div>
                <img
                  src={provider.photoUrl}
                  alt={provider.name}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-200 flex-shrink-0"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <MapPin size={12} className="mr-1" />
                      {provider.location}
                    </div>
                    <h3 className="font-semibold text-gray-900 truncate">{provider.name}</h3>
                    <p className="text-blue-600 text-xs font-medium uppercase tracking-wide">{provider.category}</p>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {provider.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No se encontraron profesionales con esos criterios.</p>
          </div>
        )}
      </div>
    </div>
  );
};