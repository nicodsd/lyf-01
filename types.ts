export enum UserRole {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER'
}

export enum ServiceCategory {
  PLOMERIA = 'Plomería',
  ELECTRICIDAD = 'Electricidad',
  CERRAJERIA = 'Cerrajería',
  GAS = 'Gasista',
  CLIMATIZACION = 'Aire Acondicionado',
  LIMPIEZA = 'Limpieza',
  ALBANILERIA = 'Albañilería',
  PINTURA = 'Pintura'
}

export interface Certification {
  id: string;
  title: string;
  institution: string;
  year: string;
}

export interface ProviderProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Hombre' | 'Mujer' | 'Otro';
  photoUrl: string;
  category: ServiceCategory;
  location: string;
  rating: number; // 0 to 5
  reviewCount: number;
  certifications: Certification[];
  description: string;
  phone: string; // For WhatsApp
  hourlyRate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile?: ProviderProfile; // Only if role is PROVIDER
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  timestamp: number;
  read: boolean;
}
