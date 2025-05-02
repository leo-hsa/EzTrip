// src/types/tour.ts

// Тип для дня недели (соответствует Weekday entity)
export interface Weekday {
    id: number;
    name: string;
    shortName: string;
  }
  

  export interface Feature {
    id: number;
    name: string;
    icon?: string; 
  }
  
  // Основной тип для Тура (соответствует Tour entity и данным из API)
  export interface Tour {
    id: string;
    title: string;
    description: string | null;
    location: string;
    durationText: string;
    price: number;
    priceCurrency: string;
    priceUnit: string;
    
    cardImageUrl?: string | null;
    galleryImageUrls?: string[]; // Массив URL для галереи (может отсутствовать)
    operationDays: Weekday[];
    features: Feature[];
   
    category?: { id: number; name: string; slug: string; };
    createdAt: string;
    updatedAt: string;

  }