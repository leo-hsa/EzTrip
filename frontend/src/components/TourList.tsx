// src/components/TourList.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
// Убедитесь, что типы импортированы правильно
import { Tour, Category } from '../types';
import { FindToursQueryDto, TourSortBy } from '../types/dto';
import { fetchTours, fetchCategories } from '../services/api';
import TourCard from './TourCard'; // Импортируем карточку
import useDebounce from '../hooks/useDebounce'; // Хук все еще может быть полезен для других фильтров в будущем

const PAGE_LIMIT = 6;

const TourList: React.FC = () => {
  // --- Состояния ---
  const [tours, setTours] = useState<Tour[]>([]);
  const [totalTours, setTotalTours] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Только категория как фильтр
  const [sortBy, setSortBy] = useState<TourSortBy>(TourSortBy.DATE_DESC); // Оставляем сортировку для API

  // --- Загрузка категорий ---
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        if (isMounted) setCategories(fetchedCategories);
      } catch (err: any) { console.error("Failed to load categories:", err.message); }
    };
    loadCategories();
    return () => { isMounted = false; };
  }, []);

  // --- Функция загрузки туров (без поиска) ---
  const loadTours = useCallback(async (loadMore = false) => {
      const currentOffset = loadMore ? offset : 0;
      const isLoadingInitial = !loadMore;
      if (isLoadingInitial) setLoading(true); else setLoadingMore(true);
      setError(null);

      const params: FindToursQueryDto = {
          limit: PAGE_LIMIT, offset: currentOffset, sortBy: sortBy,
          // Передаем только категорию
          ...(selectedCategory && { category: selectedCategory }),
      };

      try {
          const { data, total } = await fetchTours(params);
          setTours(prev => isLoadingInitial ? data : [...prev, ...data]);
          setTotalTours(total);
          setOffset(currentOffset + data.length);
      } catch (err: any) {
          setError(err.message || 'Не удалось загрузить туры.');
          console.error(err);
          if (isLoadingInitial) { setTours([]); setTotalTours(0); setOffset(0); }
      } finally {
         if (isLoadingInitial) setLoading(false); else setLoadingMore(false);
      }
  }, [offset, sortBy, selectedCategory]); // Убрали debounce

   // --- useEffect для перезагрузки (только категория и сортировка) ---
   // Примечание: loadTours теперь не зависит от offset, поэтому можно добавить в зависимости
  useEffect(() => {
    loadTours(false);
  }, [selectedCategory, sortBy, loadTours]);


  // --- Обработчик "Загрузить еще" ---
  const handleLoadMore = () => {
    if (!loadingMore && !loading && tours.length < totalTours) {
      loadTours(true);
    }
  };

  // --- Мемоизация hasMoreTours ---
  const hasMoreTours = useMemo(() => tours.length < totalTours, [tours.length, totalTours]);

  // --- РЕНДЕРИНГ КОМПОНЕНТА ---
  return (
    <div>
      {/* 1. Табы Категорий (Фильтры) */}
      <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 sm:justify-center">
            <button
              onClick={() => setSelectedCategory('')}
              // Стили для кнопки "Все туры"
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === ''
                  ? 'bg-lime-600 text-white' // Активный таб (Зеленый)
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200' // Неактивный таб
              }`}
            >
              Все туры
            </button>
            {/* Кнопки для каждой категории */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-lime-600 text-white' // Активный таб
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200' // Неактивный таб
                 }`}
              >
                {cat.name}
              </button>
            ))}
        </div>
      </div>
       {/* TODO: Можно добавить селект сортировки, если нужно */}


      {/* --- Отображение Загрузки / Ошибки / Списка --- */}
      {loading && <div className="text-center p-10 text-gray-500">Загрузка туров...</div>}
      {error && !loading && ( <div className="text-center p-6 text-red-700 bg-red-100 rounded border border-red-300">{error}</div> )}
      {!loading && !error && tours.length === 0 && ( <p className="text-center text-gray-500 py-10">По вашему запросу туры не найдены.</p> )}

      {/* --- 2. Сетка с Карточками --- */}
      {tours.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => ( <TourCard key={tour.id} tour={tour} /> ))}
        </div>
      )}

      {/* --- Кнопка "Загрузить еще" --- */}
      <div className="text-center mt-10 h-16">
          {loadingMore && <p className="text-gray-500">Загрузка...</p> }
          {!loadingMore && hasMoreTours && (
              <>
                  <button onClick={handleLoadMore} className="px-6 py-3 rounded-md text-white font-semibold transition duration-300 ease-in-out shadow bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                      Загрузить еще
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Показано {tours.length} из {totalTours}</p>
              </>
          )}
           {!loadingMore && !hasMoreTours && tours.length > 0 && ( <p className="text-sm text-gray-500">Вы посмотрели все туры</p> )}
      </div>
    </div>
  );
};

export default TourList;