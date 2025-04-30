// src/types/tour.ts

// Тип для дня недели (соответствует Weekday entity)
export interface Weekday {
    id: number;
    name: string;
    shortName: string;
  }
  
  // Тип для включенной услуги (соответствует Feature entity)
  export interface Feature {
    id: number;
    name: string;
    icon?: string; // Иконка может быть необязательной
  }
  
  // Основной тип для Тура (соответствует Tour entity и данным из API)
  export interface Tour {
    id: string; // uuid
    title: string;
    description: string | null; // Может быть null
    location: string;
    durationText: string;
    price: number; // Число (TypeORM преобразует DECIMAL в number)
    priceCurrency: string; // 'USD', 'EUR' etc.
    priceUnit: string; // 'per_person', 'per_group'
    imageUrl?: string | null; // Может отсутствовать
    operationDays: Weekday[]; // Массив дней проведения
    features: Feature[];      // Массив включенных услуг
    createdAt: string; // Дата в виде строки (ISO формат)
    updatedAt: string; // Дата в виде строки (ISO формат)
  }