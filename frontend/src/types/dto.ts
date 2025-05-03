// src/types/dto.ts

/**
 * Возможные значения для параметра сортировки туров.
 * Значения должны совпадать с enum TourSortBy на бэкенде.
 */
export enum TourSortBy {
    PRICE_ASC = 'price_asc',
    PRICE_DESC = 'price_desc',
    DATE_DESC = 'date_desc',
  }
  
  /**
   * Интерфейс для объекта query-параметров при запросе списка туров.
   * Поля являются необязательными (?).
   * Соответствует FindToursQueryDto на бэкенде.
   */
  export interface FindToursQueryDto {
    search?: string;       // Поисковый запрос по названию/описанию
    category?: string;     // Slug категории для фильтрации
    minPrice?: number;     // Минимальная цена
    maxPrice?: number;     // Максимальная цена
    // minDuration?: number;  // Минимальная длительность (если реализовано)
    // maxDuration?: number;  // Максимальная длительность (если реализовано)
    sortBy?: TourSortBy;   // Поле для сортировки
    limit?: number;        // Количество элементов на странице (для пагинации)
    offset?: number;       // Смещение от начала списка (для пагинации)
  }


  export interface CreateBookingDto {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    tourId?: string; // Опционально, если форма общая
    preferredContactMethodName?: string; // Название способа связи
    customerNotes?: string;
    agreedToPolicy: boolean;
  }

  export interface FindCarsQueryDto {
    search?: string;
    // TODO: Добавить другие фильтры, если они появятся на бэкенде
    limit?: number;
    offset?: number;
}