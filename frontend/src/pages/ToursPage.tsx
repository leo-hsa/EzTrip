
import React, { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import { Tour, Category } from '../types';
import { FindToursQueryDto, TourSortBy } from '../types/dto';
import { fetchTours, fetchCategories } from '../services/api';
import TourCard from '../components/TourCard'; // Наша карточка тура
import useDebounce from '../hooks/useDebounce'; // Хук debounce
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PAGE_LIMIT = 9; // Можно сделать больше для страницы каталога

const ToursPage: React.FC = () => {
  // --- Состояния данных ---
  const [tours, setTours] = useState<Tour[]>([]);
  const [totalTours, setTotalTours] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);

  // --- Состояния UI ---
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false); // Для мобильных фильтров

  // --- Состояния Фильтров/Сортировки ---
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPriceInput, setMinPriceInput] = useState<string>(''); // Строки для инпутов
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');
  const debouncedMinPrice = useDebounce(minPriceInput, 600); // Дебаунс для цен
  const debouncedMaxPrice = useDebounce(maxPriceInput, 600);
  const [sortBy, setSortBy] = useState<TourSortBy>(TourSortBy.DATE_DESC);
  // TODO: Добавить фильтр по длительности, если нужно

  // --- Загрузка категорий ---
  useEffect(() => {
    let isMounted = true;
    fetchCategories()
      .then(data => { if (isMounted) setCategories(data); })
      .catch(err => console.error("Failed to load categories:", err.message));
    return () => { isMounted = false; };
  }, []);

  // --- Функция загрузки туров ---
  const loadTours = useCallback(async (loadMore = false) => {
    const currentOffset = loadMore ? offset : 0;
    const isLoadingInitial = !loadMore;

    if (isLoadingInitial) setLoading(true); else setLoadingMore(true);
    setError(null);

    // Формируем параметры, преобразуя цены в числа, если они введены
    const params: FindToursQueryDto = {
      limit: PAGE_LIMIT,
      offset: currentOffset,
      sortBy: sortBy,
      ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
      ...(selectedCategory && { category: selectedCategory }),
      ...(debouncedMinPrice && { minPrice: Number(debouncedMinPrice) }),
      ...(debouncedMaxPrice && { maxPrice: Number(debouncedMaxPrice) }),
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
  }, [offset, sortBy, debouncedSearchTerm, selectedCategory, debouncedMinPrice, debouncedMaxPrice]); // Добавляем цены в зависимости

  // --- useEffect для (пере)загрузки при смене фильтров/сортировки ---
  useEffect(() => {
    loadTours(false); // Вызываем сброс при изменении любого дебаунсированного фильтра
  }, [debouncedSearchTerm, selectedCategory, sortBy, debouncedMinPrice, debouncedMaxPrice, loadTours]); // Добавили цены

  // --- Обработчик "Загрузить еще" ---
  const handleLoadMore = () => {
    if (!loadingMore && !loading && tours.length < totalTours) {
      loadTours(true);
    }
  };

  // Мемоизация hasMoreTours
  const hasMoreTours = useMemo(() => tours.length < totalTours, [tours.length, totalTours]);

  // Обработчики для инпутов цен (позволяют вводить только цифры)
  const handlePriceChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Разрешаем только цифры или пустое значение
      if (/^\d*$/.test(value)) {
        setter(value);
      }
    };

  // --- Рендеринг Компонента ---
  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">

        {/* Заголовок страницы */}
         <div className="text-center mb-8 md:mb-10">
             <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Каталог туров</h1>
             {/* Можно добавить подзаголовок или хлебные крошки */}
         </div>

         {/* Основной Layout: Фильтры слева (на больших экранах), Список справа */}
         <div className="flex flex-col lg:flex-row gap-8">

             {/* --- Фильтры --- */}
             {/* Кнопка для мобильных */}
             <div className="lg:hidden text-right mb-4">
                 <button
                     onClick={() => setShowFilters(!showFilters)}
                     className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                 >
                     <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-500" />
                     {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                 </button>
             </div>

             {/* Боковая панель/блок фильтров */}
             {/* Скрываем на мобильных, если showFilters=false */}
             <aside className={`lg:w-1/4 lg:block ${showFilters ? 'block' : 'hidden'} mb-6 lg:mb-0`}>
                 <div className="bg-white p-5 rounded-lg shadow border border-gray-200 space-y-6 sticky top-24"> {/* Делаем прилипающим */}
                     {/* 1. Поиск */}
                     <div>
                        <label htmlFor="search-tours" className="block text-sm font-medium text-gray-700 mb-1">Поиск</label>
                        <div className="relative">
                            <input
                                id="search-tours"
                                type="text"
                                placeholder="Название тура..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 text-black"
                            />
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                     </div>

                     {/* 2. Категории */}
                     <div>
                         <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                         <select
                            id="category-filter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 bg-white text-black"
                          >
                            <option value="">Все категории</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                          </select>
                     </div>

                     {/* 3. Цена */}
                     <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Цена ($)</label>
                          <div className="flex items-center space-x-2">
                              <input
                                type="text" // Используем text для контроля ввода
                                inputMode="numeric" // Подсказка для мобильной клавиатуры
                                placeholder="От"
                                value={minPriceInput}
                                onChange={handlePriceChange(setMinPriceInput)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 text-black"
                              />
                              <span className="text-gray-500">-</span>
                              <input
                                type="text"
                                inputMode="numeric"
                                placeholder="До"
                                value={maxPriceInput}
                                onChange={handlePriceChange(setMaxPriceInput)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 text-black"
                              />
                          </div>
                     </div>

                     {/* TODO: Добавить фильтр по длительности */}

                     {/* 4. Сортировка */}
                     <div>
                         <label htmlFor="sort-tours" className="block text-sm font-medium text-gray-700 mb-1">Сортировать</label>
                         <select
                             id="sort-tours"
                             value={sortBy}
                             onChange={(e) => setSortBy(e.target.value as TourSortBy)}
                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 bg-white text-black"
                           >
                             <option value={TourSortBy.DATE_DESC}>Сначала новые</option>
                             <option value={TourSortBy.PRICE_ASC}>Цена: Дешевле</option>
                             <option value={TourSortBy.PRICE_DESC}>Цена: Дороже</option>
                           </select>
                     </div>

                     {/* TODO: Кнопка "Сбросить фильтры" */}

                 </div>
             </aside>

             {/* --- Список Туров --- */}
             <div className="w-full lg:w-3/4">
                 {/* Отображение Загрузки / Ошибки / Списка */}
                 {loading && <div className="text-center p-10 text-gray-500">Загрузка туров...</div>}

                 {error && !loading && ( <div className="text-center p-6 text-red-700 bg-red-100 rounded border border-red-300">{error}</div> )}

                 {!loading && !error && tours.length === 0 && (
                      <p className="text-center text-gray-500 py-16">
                          Туры по заданным критериям не найдены. Попробуйте изменить фильтры.
                      </p>
                 )}

                 {/* Сетка туров */}
                 {tours.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                    </div>
                 )}

                 {/* Кнопка "Загрузить еще" */}
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
                     {!loadingMore && !hasMoreTours && tours.length > 0 && (
                           <p className="text-sm text-gray-500">Вы посмотрели все доступные туры</p>
                     )}
                 </div>
             </div> {/* Конец списка туров */}

         </div> {/* Конец flex layout */}
      </div> {/* Конец container */}
    </div>
  );
};

export default ToursPage;