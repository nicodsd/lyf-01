import { ProviderProfile, ServiceCategory } from '@/types';

export const MOCK_PROVIDERS: ProviderProfile[] = [
    {
        id: '1',
        name: 'Carlos Rodríguez',
        age: 34,
        gender: 'Hombre',
        category: ServiceCategory.PLOMERIA,
        location: 'Centro, Ciudad',
        photoUrl: 'https://picsum.photos/id/1005/300/300',
        rating: 4.8,
        reviewCount: 124,
        phone: '5551234567',
        description: 'Plomero especialista en reparaciones urgentes y mantenimiento residencial. 10 años de experiencia solucionando filtraciones, destapaciones y reformas de baños.',
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
        photoUrl: 'https://picsum.photos/id/1011/300/300',
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
        photoUrl: 'https://picsum.photos/id/1012/300/300',
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
        photoUrl: 'https://picsum.photos/id/1027/300/300',
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
        photoUrl: 'https://picsum.photos/id/1001/300/300',
        rating: 4.2,
        reviewCount: 30,
        phone: '5556677889',
        description: 'Gasista matriculado de primera categoría. Planos, habilitaciones y reparaciones.',
        certifications: [
            { id: 'c4', title: 'Matrícula Gasista 1ra', institution: 'MetroGas', year: '2010' }
        ]
    }
];
