// src/services/api.ts
import axios from 'axios';
import { Tour } from '../types/tour'; // Импортируем наш тип

// Определяем базовый URL для нашего API бэкенда
// Убедитесь, что порт совпадает с тем, на котором запущен NestJS
const API_BASE_URL = 'http://localhost:3000'; // Или порт из вашего .env бэкенда

// Создаем экземпляр axios с базовым URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для получения списка всех туров
export const fetchTours = async (): Promise<Tour[]> => {
  try {
    // Отправляем GET запрос на эндпоинт /tours
    const response = await apiClient.get<Tour[]>('/tours');
    // Возвращаем массив туров из ответа
    return response.data;
  } catch (error) {
    // Обрабатываем ошибки (можно улучшить логирование или обработку)
    console.error('Error fetching tours:', error);
    // Выбрасываем ошибку дальше, чтобы компонент мог ее обработать
    throw error;
  }
};

// В будущем здесь можно добавить другие функции:
// export const fetchTourById = async (id: string): Promise<Tour> => { ... };
// export const createBooking = async (bookingData: any): Promise<any> => { ... };