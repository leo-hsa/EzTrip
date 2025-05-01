// src/components/TourList.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Tour, Category } from '../types';
import { FindToursQueryDto, TourSortBy } from '../types/dto';
import { fetchTours, fetchCategories } from '../services/api';
import TourCard from './TourCard';
import useDebounce from '../hooks/useDebounce'; // Импортируем хук debounce

const PAGE_LIMIT = 6; // Количество туров на странице/загрузке

const TourList: React.FC = () => {
  // --- Состояния данных ---
  const [tours, setTours] = useState<Tour[]>([]);
  const [totalTours, setTotalTours] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);

  // --- Состояния UI ---
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0); // Текущее смещение

  // --- Состояния Фильтров/Сортировки ---
  const [searchInput, setSearchInput] = useState<string>(''); // Значение прямо из инпута
  const debouncedSearchTerm = useDebounce(searchInput, 500); // Дебаунс значения поиска (500ms)
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // slug
  const [sortBy, setSortBy] = useState<TourSortBy>(TourSortBy.DATE_DESC);
  // TODO: Добавить стейты для min/max Price

  // --- Загрузка категорий ---
  useEffect(() => {
    let isMounted = true; // Флаг для предотвращения обновления состояния на размонтированном компоненте
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        if (isMounted) {
          setCategories(fetchedCategories);
        }
      } catch (err: any) {
        console.error('Failed to load categories:', err.message);
      }
    };
    loadCategories();
    return () => { isMounted = false; }; // Очистка при размонтировании
  }, []);

  // --- Функция загрузки туров ---
  // useCallback используется для предотвращения лишних пересозданий функции
  const loadTours = useCallback(async (loadMore = false) => {
      const currentOffset = loadMore ? offset : 0; // Используем текущий offset для дозагрузки
      const isLoadingInitial = !loadMore;

      if (isLoadingInitial) setLoading(true); else setLoadingMore(true);
      setError(null);

      const params: FindToursQueryDto = {
          limit: PAGE_LIMIT,
          offset: currentOffset,
          sortBy: sortBy,
          ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
          ...(selectedCategory && { category: selectedCategory }),
          // TODO: Добавить параметры цен
      };

      try {
          const { data, total } = await fetchTours(params);
          setTours(prev => isLoadingInitial ? data : [...prev, ...data]);
          setTotalTours(total);
          setOffset(currentOffset + data.length); // Обновляем смещение на основе полученных данных
      } catch (err: any) {
          setError(err.message || 'Не удалось загрузить туры.');
          console.error(err);
          if (isLoadingInitial) { // Сбрасываем только при основной загрузке
              setTours([]);
              setTotalTours(0);
              setOffset(0);
          }
      } finally {
         if (isLoadingInitial) setLoading(false); else setLoadingMore(false);
      }
  // Зависимости useCallback: при их изменении функция будет создана заново
  }, [offset, sortBy, debouncedSearchTerm, selectedCategory]);

  // --- useEffect для (пере)загрузки при смене фильтров ---
  // Запускается при изменении дебаунсированного поиска, категории или сортировки
  useEffect(() => {
      // Вызываем loadTours БЕЗ флага loadMore, что сбросит offset и tours
      loadTours(false);
  // Не добавляем loadTours в зависимости, т.к. он сам зависит от этих же параметров
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, selectedCategory, sortBy]);


  // --- Обработчик "Загрузить еще" ---
  const handleLoadMore = () => {
    // Загружаем еще, только если не идет загрузка и есть еще туры
    if (!loadingMore && !loading && tours.length < totalTours) {
      loadTours(true);
    }
  };

  // Мемоизация для определения, есть ли еще туры для загрузки
  const hasMoreTours = useMemo(() => tours.length < totalTours, [tours.length, totalTours]);

  // --- Рендеринг Компонента ---
  return (
    <div>
      {/* Панель Фильтров */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow border border-gray-200 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
        <div className="w-full sm:w-auto sm:flex-grow lg:flex-grow-0 lg:w-1/3">
          <label htmlFor="search-input" className="sr-only">Поиск</label> {/* Label для доступности */}
          <input
            id="search-input"
            type="text"
            placeholder="Поиск по названию..."
            value={searchInput} // Управляем инпутом через searchInput
            onChange={(e) => setSearchInput(e.target.value)} // Обновляем searchInput немедленно
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500"
          />
        </div>
        <div className="w-full sm:w-auto sm:flex-grow-0">
          <label htmlFor="category-select" className="sr-only">Категория</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 bg-white"
          >
            <option value="">Все категории</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-auto sm:flex-grow-0">
           <label htmlFor="sort-select" className="sr-only">Сортировка</label>
           <select
             id="sort-select"
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value as TourSortBy)}
             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 bg-white"
           >
             <option value={TourSortBy.DATE_DESC}>Сначала новые</option>
             <option value={TourSortBy.PRICE_ASC}>Цена: по возрастанию</option>
             <option value={TourSortBy.PRICE_DESC}>Цена: по убыванию</option>
           </select>
        </div>
         {/* TODO: Добавить фильтры по цене */}
      </div>

      {/* --- Отображение Загрузки / Ошибки / Списка --- */}
      {loading && <div className="text-center p-10 text-gray-500">Загрузка туров...</div>}

      {error && !loading && ( // Показываем ошибку только если нет основной загрузки
        <div className="text-center p-6 text-red-700 bg-red-100 rounded border border-red-300">{error}</div>
      )}

      {!loading && !error && tours.length === 0 && ( // Сообщение "не найдено"
           <p className="col-span-full text-center text-gray-500 py-10">
               По вашему запросу туры не найдены. Попробуйте изменить фильтры.
           </p>
      )}

      {/* Сетка туров (показываем даже если идет loadingMore) */}
      {tours.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}

      {/* Кнопка "Загрузить еще" и индикатор загрузки */}
      <div className="text-center mt-10 h-16"> {/* Резервируем место */}
          {loadingMore && <p className="text-gray-500">Загрузка...</p> }

          {!loadingMore && hasMoreTours && ( // Показываем кнопку, если есть что грузить и не идет загрузка
              <>
                  <button
                      onClick={handleLoadMore}
                      className="px-6 py-3 rounded-md text-white font-semibold transition duration-300 ease-in-out shadow bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                  >
                      Загрузить еще
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                      Показано {tours.length} из {totalTours}
                  </p>
              </>
          )}
           {!loadingMore && !hasMoreTours && tours.length > 0 && ( // Сообщение, что все загружено
                <p className="text-sm text-gray-500">Вы посмотрели все туры</p>
            )}
      </div>
    </div>
  );
};

export default TourList;