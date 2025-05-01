// src/services/api.ts
import axios from 'axios';
import { Tour, Category, FindToursQueryDto, TourSortBy } from '../types';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для получения списка туров с параметрами
export const fetchTours = async (
  params: FindToursQueryDto = {} // Принимаем объект с параметрами
): Promise<{ data: Tour[]; total: number }> => { // Возвращаем объект
  try {
    // Передаем параметры как query params
    const response = await apiClient.get<{ data: Tour[]; total: number }>(
        '/tours',
        { params } // axios автоматически преобразует объект в query string
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    // Можно добавить более специфичную обработку ошибок
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch tours');
    }
    throw new Error('An unknown error occurred while fetching tours');
  }
};

// Функция для получения списка категорий
export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await apiClient.get<Category[]>('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
         if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch categories');
        }
        throw new Error('An unknown error occurred while fetching categories');
    }
};

// TODO: Определить типы Category и FindToursQueryDto в src/types/index.ts (или отдельных файлах)
// Примерно так:
/*
// src/types/category.ts
export interface Category {
  id: number;
  name: string;
  slug: string;
}

// src/types/dto.ts (или tours.dto.ts)
export enum TourSortBy {
    PRICE_ASC = 'price_asc',
    PRICE_DESC = 'price_desc',
    DATE_DESC = 'date_desc',
}
export interface FindToursQueryDto {
    search?: string;
    category?: string; // slug
    minPrice?: number;
    maxPrice?: number;
    sortBy?: TourSortBy;
    limit?: number;
    offset?: number;
}
*/