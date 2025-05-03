// src/components/SearchModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// --- Импортируем все нужные типы ---
import { Tour, Car } from '../types'; // Убедитесь, что Car экспортируется
import { FindToursQueryDto, FindCarsQueryDto } from '../types/dto'; // Убедитесь, что FindCarsQueryDto экспортируется
// --- Импортируем API функции ---
import { fetchTours, fetchCars } from '../services/api'; // Убедитесь, что путь верный
import useDebounce from '../hooks/useDebounce'; // Убедитесь, что путь верный
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

// --- Определяем интерфейс пропсов ---
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}
// -----------------------------------

// Компонент TourResultItem
const TourResultItem: React.FC<{ tour: Tour }> = ({ tour }) => (
    <Link
        to={`/tours/${tour.id}`}
        className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-150"
    >
        {/* Используем cardImageUrl, как определено в вашем типе Tour */}
        <img
            src={tour.cardImageUrl || '/images/placeholder-card.jpg'}
            alt={tour.title}
            className="w-12 h-12 object-cover rounded mr-3 flex-shrink-0"
            loading="lazy"
        />
        <div>
            <p className="font-semibold text-sm text-gray-800 line-clamp-1">{tour.title}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{tour.description || 'Нет описания'}</p>
        </div>
    </Link>
);

// Компонент CarResultItem
const CarResultItem: React.FC<{ car: Car }> = ({ car }) => (
     <Link
        to={`/cars/${car.id}`} // TODO: Убедитесь, что этот роут существует
        className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors duration-150"
     >
        <img
            src={car.imageUrl || '/images/placeholder-car.jpg'}
            alt={car.name}
            className="w-12 h-12 object-contain rounded mr-3 flex-shrink-0 bg-gray-100 p-1"
            loading="lazy"
        />
        <div>
            <p className="font-semibold text-sm text-gray-800 line-clamp-1">{car.name}</p>
            <p className="text-xs text-gray-500 line-clamp-1">
                {car.transmission === 'automatic' ? 'Автомат' : 'Механика'}, {car.fuelType || ''}{car.dailyPrice ? `, $${car.dailyPrice}/день` : ''}
            </p>
        </div>
    </Link>
);

// Основной компонент модального окна
const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 400);
    const [tourResults, setTourResults] = useState<Tour[]>([]);
    const [carResults, setCarResults] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchAttempted, setSearchAttempted] = useState(false);
    const modalContentRef = useRef<HTMLDivElement>(null);

    // --- Логика поиска ---
    useEffect(() => {
        // Не делаем запрос, если термин пуст или слишком короткий
        if (!debouncedSearchTerm || debouncedSearchTerm.trim().length < 3) {
            setTourResults([]);
            setCarResults([]);
            setLoading(false);
            setError(null);
            // Помечаем, что попытка была, если что-то введено (даже если < 3 символов)
            setSearchAttempted(!!debouncedSearchTerm);
            return;
        }

        let isMounted = true; // Флаг для отмены обновлений после размонтирования
        const searchAll = async () => {
            setLoading(true);
            setError(null);
            setSearchAttempted(true);
            const term = debouncedSearchTerm.trim();
            const tourParams: FindToursQueryDto = { search: term, limit: 5 }; // Ограничиваем результаты
            const carParams: FindCarsQueryDto = { search: term, limit: 5 }; // Ограничиваем результаты

            try {
                // Параллельные запросы с индивидуальной обработкой ошибок
                const [tourRes, carRes] = await Promise.all([
                    fetchTours(tourParams).catch(e => {
                        console.error("Tour search failed:", e);
                        // Возвращаем пустой результат в случае ошибки, чтобы Promise.all не упал
                        return { data: [], total: 0 };
                    }),
                    fetchCars(carParams).catch(e => {
                        console.error("Car search failed:", e);
                        return { data: [], total: 0 };
                    })
                ]);

                // Обновляем состояние только если компонент все еще смонтирован
                if (isMounted) {
                    setTourResults(tourRes.data);
                    setCarResults(carRes.data);
                    // Можно установить общую ошибку, если оба запроса упали,
                    // но сейчас мы просто показываем то, что удалось загрузить.
                }
            } catch (err: any) { // Эта ошибка маловероятна из-за catch в Promise.all
                if (isMounted) {
                    setError('Произошла непредвиденная ошибка при поиске.');
                }
                console.error("Combined search error (should not happen often):", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        searchAll();

        // Функция очистки для useEffect
        return () => {
            isMounted = false; // Предотвращаем обновление состояния после размонтирования
        };
    }, [debouncedSearchTerm]); // Запускаем эффект при изменении дебаунсированного термина

    // --- Логика закрытия при клике вне ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          // Проверяем, что клик был вне элемента, на который установлен ref
          if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
            onClose(); // Вызываем функцию закрытия, переданную через props
          }
        };
        // Добавляем слушатель только если модалка открыта
        if (isOpen) {
          // Используем 'mousedown', чтобы сработать до возможного 'click' на элементе внутри
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          // Удаляем слушатель, если модалка закрыта
          document.removeEventListener('mousedown', handleClickOutside);
        }
        // Очистка слушателя при размонтировании компонента или изменении isOpen/onClose
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpen, onClose]); // Зависимости эффекта

    // --- Логика сброса состояния при закрытии ---
    useEffect(() => {
        if (!isOpen) {
            // Задержка небольшая, чтобы пользователь не видел сброса перед анимацией закрытия (если она есть)
            const timer = setTimeout(() => {
                setSearchTerm('');
                setTourResults([]);
                setCarResults([]);
                setLoading(false);
                setError(null);
                setSearchAttempted(false);
            }, 200); // 200ms задержка
             return () => clearTimeout(timer);
        }
    }, [isOpen]);


    // Не рендерим компонент, если он закрыт
    if (!isOpen) return null;

    // Определяем, есть ли какие-либо результаты
    const hasResults = tourResults.length > 0 || carResults.length > 0;

    return (
        // Оверлей
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex justify-center items-start pt-16 md:pt-24 px-4">
            {/* Контейнер модального окна */}
            <div ref={modalContentRef} className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative max-h-[80vh] flex flex-col">
                {/* Шапка с поиском */}
                <div className="p-4 border-b border-gray-200 flex items-center flex-shrink-0"> {/* Добавили flex-shrink-0 */}
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Найти туры или авто..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus // Автофокус при открытии
                        className="flex-grow text-base outline-none border-none focus:ring-0 placeholder-gray-400 bg-transparent text-black" // Убрали фон инпута
                    />
                    {/* Кнопка очистки (появляется если есть текст) */}
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600 mr-2 p-1">
                            <XMarkIcon className="h-5 w-5"/>
                        </button>
                    )}
                    {/* Кнопка закрытия */}
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1">
                        <XMarkIcon className="h-6 w-6"/>
                    </button>
                </div>

                {/* Тело модалки с результатами */}
                <div className="p-2 overflow-y-auto flex-grow"> {/* Добавили flex-grow */}
                    {/* Индикатор загрузки */}
                    {loading && <p className="text-center text-gray-500 py-4">Идет поиск...</p>}

                    {/* Сообщение об ошибке */}
                    {error && <p className="text-center text-red-600 py-4">{error}</p>}

                    {/* Отображение результатов */}
                    {!loading && !error && hasResults && (
                        <div className="space-y-3">
                           {/* Результаты туров */}
                           {tourResults.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-semibold uppercase text-gray-400 px-3 mb-1">Туры ({tourResults.length})</h4>
                                    <ul className="space-y-0.5">{tourResults.map(tour => ( <li key={`tour-${tour.id}`}><TourResultItem tour={tour} /></li> ))}</ul>
                                </div>
                            )}
                            {/* Результаты машин */}
                            {carResults.length > 0 && (
                                <div>
                                     <h4 className="text-xs font-semibold uppercase text-gray-400 px-3 mb-1 mt-3">Аренда Авто ({carResults.length})</h4>
                                     <ul className="space-y-0.5">{carResults.map(car => ( <li key={`car-${car.id}`}><CarResultItem car={car} /></li> ))}</ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Сообщения об отсутствии результатов и т.д. */}
                     {!loading && !error && !hasResults && searchAttempted && debouncedSearchTerm.length >= 3 && (
                        <p className="text-center text-gray-500 py-6">По запросу "{debouncedSearchTerm}" ничего не найдено.</p>
                     )}
                     {!loading && !error && !hasResults && !searchAttempted && searchTerm.length > 0 && searchTerm.length < 3 && (
                        <p className="text-center text-gray-400 py-6 text-sm">Введите не менее 3 символов для поиска.</p>
                     )}
                     {!loading && !error && !hasResults && !searchAttempted && searchTerm.length === 0 && (
                         <p className="text-center text-gray-400 py-6 text-sm">Начните вводить для поиска туров или авто...</p>
                     )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;