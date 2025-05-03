import axios from 'axios';
// --- Импортируем типы из соответствующих файлов или из index.ts ---
import { Tour, Category, Car } from '../types'; // Убедитесь, что Car экспортируется из ../types (или ../types/car)
import { FindToursQueryDto, CreateBookingDto, FindCarsQueryDto } from '../types/dto'; // Убедитесь, что FindCarsQueryDto экспортируется

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Получение списка туров с параметрами.
 */
export const fetchTours = async (params: FindToursQueryDto = {}): Promise<{ data: Tour[]; total: number }> => {
  try {
    const response = await apiClient.get<{ data: Tour[]; total: number }>('/tours', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tours:', error);
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Не удалось загрузить туры.';
      throw new Error(message);
    }
    throw new Error('Произошла неизвестная ошибка при загрузке туров.');
  }
};

/**
 * Получение списка категорий.
 */
export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await apiClient.get<Category[]>('/categories');
        return response.data;
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
 * Получение тура по ID.
 */
export const fetchTourById = async (id: string): Promise<Tour> => {
  if (!id) throw new Error('ID тура не может быть пустым.');
  try {
      const response = await apiClient.get<Tour>(`/tours/${id}`);
      return response.data;
  } catch (error) {
      console.error(`Error fetching tour with id ${id}:`, error);
      if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 404) throw new Error('Тур с таким ID не найден.');
          const message = error.response.data?.message || 'Не удалось загрузить информацию о туре.';
          throw new Error(message);
      }
      throw new Error('Произошла неизвестная ошибка при загрузке тура.');
  }
};

/**
 * Создание бронирования.
 */
export const createBooking = async (bookingData: CreateBookingDto): Promise<any> => {
  try {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    if (axios.isAxiosError(error) && error.response) {
      if (Array.isArray(error.response.data.message)) {
          throw new Error(`Ошибка данных: ${error.response.data.message.join('; ')}`);
      }
      const message = error.response.data?.message || 'Не удалось создать бронирование.';
      throw new Error(message);
    }
    throw new Error('Произошла неизвестная ошибка при создании бронирования.');
  }
};

/**
 * Получение списка машин с параметрами.
 */
export const fetchCars = async (params: FindCarsQueryDto = {}): Promise<{ data: Car[]; total: number }> => {
  try {
      const response = await apiClient.get<{ data: Car[]; total: number }>('/cars', { params });
      const carsWithNumberPrice = response.data.data.map(car => ({ ...car, dailyPrice: Number(car.dailyPrice) }));
      return { data: carsWithNumberPrice, total: response.data.total };
  } catch (error) {
      console.error('Error fetching cars:', error);
      if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message || 'Не удалось загрузить машины.'); // Исправлено сообщение об ошибке
      }
      throw new Error('Произошла неизвестная ошибка при загрузке машин.'); // Исправлено сообщение об ошибке
  }
};


export const fetchCarById = async (id: number): Promise<Car> => {
  if (!id || isNaN(id)) { // Проверяем, что ID - число
      throw new Error('ID автомобиля должен быть числом.');
  }
  try {
      const response = await apiClient.get<Car>(`/cars/${id}`); // Используем эндпоинт /cars/:id
      // Преобразуем цену в число
      const carData = {
          ...response.data,
          dailyPrice: Number(response.data.dailyPrice)
      };
      return carData;
  } catch (error) {
      console.error(`Error fetching car with id ${id}:`, error);
      if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 404) {
              throw new Error('Автомобиль с таким ID не найден.');
          }
          const message = error.response.data?.message || 'Не удалось загрузить информацию об автомобиле.';
          throw new Error(message);
      }
      throw new Error('Произошла неизвестная ошибка при загрузке автомобиля.');
  }
};