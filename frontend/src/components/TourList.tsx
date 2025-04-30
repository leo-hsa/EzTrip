// src/components/TourList.tsx
import React, { useState, useEffect } from 'react';
import { Tour } from '../types/tour';
import { fetchTours } from '../services/api'; // Импортируем нашу API функцию
import TourCard from './TourCard'; // Импортируем компонент карточки

const TourList: React.FC = () => {
  // Состояния компонента
  const [tours, setTours] = useState<Tour[]>([]); // Массив туров
  const [loading, setLoading] = useState<boolean>(true); // Статус загрузки
  const [error, setError] = useState<string | null>(null); // Сообщение об ошибке

  // useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true); // Начинаем загрузку
        setError(null); // Сбрасываем ошибку
        const data = await fetchTours(); // Вызываем функцию API
        setTours(data); // Сохраняем полученные данные
      } catch (err) {
        // Если произошла ошибка при загрузке
        setError('Не удалось загрузить туры. Попробуйте позже.');
        console.error(err); // Логируем ошибку для отладки
      } finally {
        // В любом случае (успех или ошибка) завершаем загрузку
        setLoading(false);
      }
    };

    loadTours(); // Вызываем функцию загрузки
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

  // Отображение статуса загрузки
  if (loading) {
    return <div className="text-center p-10">Загрузка туров...</div>;
  }

  // Отображение ошибки
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  // Отображение списка туров, если нет загрузки и ошибок
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Популярные туры</h2>
      {/* Используем grid для отображения карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.length > 0 ? (
          tours.map((tour) => (
            // Для каждого тура рендерим компонент TourCard
            <TourCard key={tour.id} tour={tour} />
          ))
        ) : (
          // Сообщение, если туры не найдены
          <p className="col-span-full text-center text-gray-500">
             Туры не найдены.
          </p>
        )}
      </div>
    </div>
  );
};

export default TourList;