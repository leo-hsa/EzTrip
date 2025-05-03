// src/pages/CarsPage.tsx
import React, { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
// Импортируем типы и API для машин
import { Car, TransmissionType, FuelType } from '../types';
import { FindCarsQueryDto } from '../types/dto';
import { fetchCars } from '../services/api';
// Импортируем компоненты и хуки
import CarCard from '../components/CarCard'; // Карточка машины
import useDebounce from '../hooks/useDebounce';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const PAGE_LIMIT = 9; // Машин на странице

const CarsPage: React.FC = () => {
  // --- Состояния данных ---
  const [cars, setCars] = useState<Car[]>([]);
  const [totalCars, setTotalCars] = useState<number>(0);

  // --- Состояния UI ---
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // --- Состояния Фильтров/Сортировки ---
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [selectedTransmission, setSelectedTransmission] = useState<string>(''); // "", "automatic", "manual"
  const [selectedFuelType, setSelectedFuelType] = useState<string>(''); // "", "petrol", "diesel" etc.
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');
  const debouncedMinPrice = useDebounce(minPriceInput, 600);
  const debouncedMaxPrice = useDebounce(maxPriceInput, 600);
  // const [sortBy, setSortBy] = useState<string>('name_asc'); // TODO: Добавить сортировку

  // --- Функция загрузки машин ---
  const loadCars = useCallback(async (loadMore = false) => {
    const currentOffset = loadMore ? offset : 0;
    const isLoadingInitial = !loadMore;
    if (isLoadingInitial) setLoading(true); else setLoadingMore(true);
    setError(null);

    const params: FindCarsQueryDto = {
      limit: PAGE_LIMIT,
      offset: currentOffset,
      // sortBy: sortBy, // TODO: Добавить сортировку
      ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
      // --- Передаем фильтры (но бэкенд их пока не использует) ---
      ...(selectedTransmission && { transmission: selectedTransmission }),
      ...(selectedFuelType && { fuelType: selectedFuelType }),
      ...(debouncedMinPrice && { minPrice: Number(debouncedMinPrice) }),
      ...(debouncedMaxPrice && { maxPrice: Number(debouncedMaxPrice) }),
      // ---------------------------------------------------------
    };

    try {
      const { data, total } = await fetchCars(params); // Вызываем fetchCars
      setCars(prev => isLoadingInitial ? data : [...prev, ...data]);
      setTotalCars(total);
      setOffset(currentOffset + data.length);
    } catch (err: any) {
      setError(err.message || 'Не удалось загрузить автомобили.');
      console.error(err);
      if (isLoadingInitial) { setCars([]); setTotalCars(0); setOffset(0); }
    } finally {
       if (isLoadingInitial) setLoading(false); else setLoadingMore(false);
    }
   // Зависимости - все используемые фильтры
  }, [offset, /* sortBy, */ debouncedSearchTerm, selectedTransmission, selectedFuelType, debouncedMinPrice, debouncedMaxPrice]);

  // --- useEffect для перезагрузки при смене фильтров ---
  useEffect(() => {
    loadCars(false);
   // Зависимости - все используемые фильтры
  }, [debouncedSearchTerm, selectedTransmission, selectedFuelType, /* sortBy, */ debouncedMinPrice, debouncedMaxPrice, loadCars]);


  // --- Обработчик "Загрузить еще" ---
  const handleLoadMore = () => {
    if (!loadingMore && !loading && cars.length < totalCars) {
      loadCars(true);
    }
  };

  // Мемоизация hasMoreCars
  const hasMoreCars = useMemo(() => cars.length < totalCars, [cars.length, totalCars]);

  // Обработчики для инпутов цен
  const handlePriceChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) setter(value);
    };

  // --- Рендеринг Компонента ---
  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">

         {/* Заголовок страницы */}
         <div className="text-center mb-8 md:mb-10">
             <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Аренда Автомобилей</h1>
             <p className="text-gray-600 mt-2">Выберите подходящий автомобиль для вашего путешествия</p>
         </div>

         <div className="flex flex-col lg:flex-row gap-8">
             {/* --- Фильтры --- */}
             <div className="lg:hidden text-right mb-4">
                 <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                     <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-500" />
                     {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                 </button>
             </div>
             <aside className={`lg:w-1/4 lg:block ${showFilters ? 'block' : 'hidden'} mb-6 lg:mb-0`}>
                 <div className="bg-white p-5 rounded-lg shadow border border-gray-200 space-y-6 sticky top-24">
                     {/* Поиск */}
                     <div>
                        <label htmlFor="search-cars" className="block text-sm font-medium text-gray-700 mb-1">Поиск</label>
                        <div className="relative">
                             <input id="search-cars" type="text" placeholder="Модель авто..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500"/>
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        </div>
                     </div>
                     {/* Тип трансмиссии */}
                     <div>
                         <label htmlFor="transmission-filter" className="block text-sm font-medium text-gray-700 mb-1">Коробка передач</label>
                         <select id="transmission-filter" value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 bg-white">
                            <option value="">Любая</option>
                            <option value={TransmissionType.AUTOMATIC}>Автомат</option>
                            <option value={TransmissionType.MANUAL}>Механика</option>
                          </select>
                     </div>
                     {/* Тип топлива */}
                     <div>
                         <label htmlFor="fuel-filter" className="block text-sm font-medium text-gray-700 mb-1">Тип топлива</label>
                         <select id="fuel-filter" value={selectedFuelType} onChange={(e) => setSelectedFuelType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 bg-white">
                            <option value="">Любой</option>
                            <option value={FuelType.PETROL}>Бензин</option>
                            <option value={FuelType.DIESEL}>Дизель</option>
                            <option value={FuelType.ELECTRIC}>Электро</option>
                            <option value={FuelType.HYBRID}>Гибрид</option>
                            <option value={FuelType.GAS}>Газ</option>
                          </select>
                     </div>
                     {/* Цена ($/день) */}
                     <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Цена ($/день)</label>
                          <div className="flex items-center space-x-2">
                              <input type="text" inputMode="numeric" placeholder="От" value={minPriceInput} onChange={handlePriceChange(setMinPriceInput)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500"/>
                              <span className="text-gray-500">-</span>
                              <input type="text" inputMode="numeric" placeholder="До" value={maxPriceInput} onChange={handlePriceChange(setMaxPriceInput)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500"/>
                          </div>
                     </div>
                     {/* TODO: Добавить сортировку */}
                 </div>
             </aside>

             {/* --- Список Машин --- */}
             <div className="w-full lg:w-3/4">
                 {loading && <div className="text-center p-10 text-gray-500">Загрузка автомобилей...</div>}
                 {error && !loading && ( <div className="text-center p-6 text-red-700 bg-red-100 rounded border border-red-300">{error}</div> )}
                 {!loading && !error && cars.length === 0 && (
                      <p className="text-center text-gray-500 py-16">Автомобили не найдены.</p>
                 )}

                 {/* Сетка машин */}
                 {cars.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Используем CarCard */}
                        {cars.map((car) => ( <CarCard key={car.id} car={car} /> ))}
                    </div>
                 )}

                 {/* Кнопка "Загрузить еще" */}
                 <div className="text-center mt-10 h-16">
                     {loadingMore && <p className="text-gray-500">Загрузка...</p> }
                     {!loadingMore && hasMoreCars && (
                         <>
                             <button onClick={handleLoadMore} className="px-6 py-3 rounded-md text-white font-semibold transition duration-300 ease-in-out shadow bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                                 Загрузить еще
                             </button>
                             <p className="text-xs text-gray-500 mt-2">Показано {cars.length} из {totalCars}</p>
                         </>
                     )}
                     {!loadingMore && !hasMoreCars && cars.length > 0 && (
                           <p className="text-sm text-gray-500">Вы посмотрели все автомобили</p>
                     )}
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default CarsPage;