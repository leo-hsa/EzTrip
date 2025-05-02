// src/services/api.ts
import axios from 'axios';
// Импортируем все нужные типы. Убедитесь, что они определены в указанных файлах
import { Tour, Category } from '../types'; // Предполагаем, что эти типы в src/types/index.ts или отдельных файлах
import { FindToursQueryDto, CreateBookingDto } from '../types/dto'; // Предполагаем, что эти типы в src/types/dto.ts

// Базовый URL вашего бэкенда
const API_BASE_URL = 'http://localhost:3000'; // Убедитесь, что порт верный

// Создаем настроенный экземпляр axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Accept': 'application/json' // Можно добавить для явности
  },
  // timeout: 10000, // Опционально: установить таймаут для запросов (в мс)
});

/**
 * Функция для получения списка туров с параметрами фильтрации, сортировки и пагинации.
 * @param params - Объект с параметрами запроса (FindToursQueryDto).
 * @returns Promise, который разрешается объектом { data: Tour[], total: number }.
 */
export const fetchTours = async (
  params: FindToursQueryDto = {}
): Promise<{ data: Tour[]; total: number }> => {
  try {
    const response = await apiClient.get<{ data: Tour[]; total: number }>(
        '/tours', // Путь к эндпоинту
        { params } // Передаем параметры как query string
    );
    return response.data; // Возвращаем данные из ответа { data: [...], total: ... }
  } catch (error) {
    console.error('Error fetching tours:', error);
    // Обработка ошибок Axios
    if (axios.isAxiosError(error) && error.response) {
      // Пытаемся извлечь сообщение об ошибке от бэкенда
      const message = error.response.data?.message || 'Не удалось загрузить туры.';
      throw new Error(message);
    }
    // Другие типы ошибок
    throw new Error('Произошла неизвестная ошибка при загрузке туров.');
  }
};

/**
 * Функция для получения списка всех категорий.
 * @returns Promise, который разрешается массивом Category[].
 */
export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await apiClient.get<Category[]>('/categories');
        return response.data; // Возвращаем массив категорий
    } catch (error) {
        console.error('Error fetching categories:', error);
        if (axios.isAxiosError(error) && error.response) {
          const message = error.response.data?.message || 'Не удалось загрузить категории.';
          throw new Error(message);
        }
        throw new Error('Произошла неизвестная ошибка при загрузке категорий.');
    }
};

/**
 * Функция для получения информации о конкретном туре по его ID.
 * @param id - UUID тура.
 * @returns Promise, который разрешается объектом Tour.
 */
export const fetchTourById = async (id: string): Promise<Tour> => {
  if (!id) { // Добавим проверку на пустой ID
      throw new Error('ID тура не может быть пустым.');
  }
  try {
      const response = await apiClient.get<Tour>(`/tours/${id}`);
      return response.data; // Возвращаем объект тура
  } catch (error) {
      console.error(`Error fetching tour with id ${id}:`, error);
      if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 404) {
              throw new Error('Тур с таким ID не найден.'); // Специфичная ошибка 404
          }
          // Другие ошибки от сервера
          const message = error.response.data?.message || 'Не удалось загрузить информацию о туре.';
          throw new Error(message);
      }
      throw new Error('Произошла неизвестная ошибка при загрузке тура.');
  }
};

/**
 * Функция для отправки данных формы бронирования на бэкенд.
 * @param bookingData - Объект с данными бронирования (CreateBookingDto).
 * @returns Promise, который разрешается ответом от сервера (тип можно уточнить).
 */
export const createBooking = async (bookingData: CreateBookingDto): Promise<any> => {
  try {
    // Отправляем POST запрос с данными в теле
    const response = await apiClient.post('/bookings', bookingData);
    return response.data; // Возвращаем ответ сервера (например, созданное бронирование)
  } catch (error) {
    console.error('Error creating booking:', error);
    if (axios.isAxiosError(error) && error.response) {
      // Обработка ошибок валидации от NestJS (массив сообщений)
      if (Array.isArray(error.response.data.message)) {
          throw new Error(`Ошибка данных: ${error.response.data.message.join('; ')}`);
      }
      // Другие ошибки (например, 404 если тур не найден, или 500)
      const message = error.response.data?.message || 'Не удалось создать бронирование.';
      throw new Error(message);
    }
    throw new Error('Произошла неизвестная ошибка при создании бронирования.');
  }
};

// Убедитесь, что типы определены в соответствующих файлах:
// src/types/index.ts или src/types/tour.ts, src/types/category.ts
// src/types/dto.ts