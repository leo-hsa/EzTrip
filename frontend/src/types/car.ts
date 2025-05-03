// src/types/car.ts
// Enum'ы можно скопировать из бэкенда или определить заново
export enum TransmissionType { MANUAL = 'manual', AUTOMATIC = 'automatic' }
export enum FuelType { PETROL = 'petrol', DIESEL = 'diesel', GAS = 'gas', ELECTRIC = 'electric', HYBRID = 'hybrid' }

export interface CarFeature {
  id: number;
  name: string;
  icon?: string;
}

export interface Car {
  id: number;
  name: string;
  transmission: TransmissionType;
  fuelType: FuelType;
  dailyPrice: number; // Придет как строка из JSON, но лучше преобразовать в number
  priceCurrency: string;
  bodyStyle?: string;
  doors?: number;
  passengers?: number;
  color?: string;
  year?: number;
  engineDescription?: string;
  imageUrl?: string | null;
  features: CarFeature[]; // Массив фич
  createdAt: string;
  updatedAt: string;
}