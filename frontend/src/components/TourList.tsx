// src/components/TourList.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Tour, Category } from '../types';
import { FindToursQueryDto, TourSortBy } from '../types/dto';
import { fetchTours, fetchCategories } from '../services/api';
import TourCard from './TourCard';
import useDebounce from '../hooks/useDebounce';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const PAGE_LIMIT = 6;

const TourList: React.FC = () => {

  const [tours, setTours] = useState<Tour[]>([]);
  const [totalTours, setTotalTours] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<TourSortBy>(TourSortBy.DATE_DESC); 

  // --- Загрузка категорий (без изменений) ---
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

  // --- Функция загрузки туров (без изменений) ---
  const loadTours = useCallback(async (loadMore = false) => {
      const currentOffset = loadMore ? offset : 0;
      const isLoadingInitial = !loadMore;
      if (isLoadingInitial) setLoading(true); else setLoadingMore(true);
      setError(null);
      const params: FindToursQueryDto = {
          limit: PAGE_LIMIT, offset: currentOffset, sortBy: sortBy,
          ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
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
  }, [offset, sortBy, debouncedSearchTerm, selectedCategory]); // Добавили loadTours в зависимости useCallback неявно

   // --- useEffect для (пере)загрузки при смене фильтров (без изменений) ---
  useEffect(() => {
    loadTours(false);
  }, [debouncedSearchTerm, selectedCategory, sortBy, loadTours]); // Добавили loadTours

  const handleLoadMore = () => {
    if (!loadingMore && !loading && tours.length < totalTours) {
      loadTours(true);
    }
  };

  const hasMoreTours = useMemo(() => tours.length < totalTours, [tours.length, totalTours]);

  
  return (
    <div>
  
      <div className="mb-6 relative ">
        <input
          id="search-input"
          type="text"
          placeholder="Поиск туров по названию..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent placeholder-gray-400" // rounded-full
        />
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" /> 
      </div>

    
      <div className="mb-8 overflow-x-auto pb-2"> 
          <div className="flex space-x-2 sm:justify-center"> 
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === ''
                  ? 'bg-lime-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200' 
              }`}
            >
              Все туры
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                 className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-lime-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                 }`}
              >
                {cat.name}
              </button>
            ))}
        </div>
      </div>
      


     
      {loading && <div className="text-center p-10 text-gray-500">Загрузка туров...</div>}

      {error && !loading && (
        <div className="text-center p-6 text-red-700 bg-red-100 rounded border border-red-300">{error}</div>
      )}

      {!loading && !error && tours.length === 0 && (
           <p className="text-center text-gray-500 py-10">
               По вашему запросу туры не найдены. Попробуйте изменить фильтры.
           </p>
      )}

     
      {tours.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}

     
      <div className="text-center mt-10 h-16">
          {loadingMore && <p className="text-gray-500">Загрузка...</p> }
          {!loadingMore && hasMoreTours && (
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
           {!loadingMore && !hasMoreTours && tours.length > 0 && (
                <p className="text-sm text-gray-500">Вы посмотрели все туры</p>
            )}
      </div>
    </div>
  );
};

export default TourList;