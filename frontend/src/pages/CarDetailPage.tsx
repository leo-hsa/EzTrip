// src/pages/CarDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Импортируем типы из вашего основного файла типов или конкретных файлов
import { Car, CarFeature, TransmissionType, FuelType } from '../types';
// Импортируем функцию API
import { fetchCarById } from '../services/api';
// Импортируем иконки
import {
    ArrowLeftIcon,
    UsersIcon,
    CogIcon,
    BoltIcon,
    FireIcon,
    CheckIcon,
    CalendarDaysIcon,
    PaintBrushIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

// --- Вспомогательные Компоненты (Определяем ДО их использования) ---

// Компонент для отображения характеристики
const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | number | undefined | null }> = ({ icon: Icon, label, value }) => {
    // Улучшенная проверка на пустые значения
    if (value === undefined || value === null || value === '') return null;
    return (
        <div className="flex items-center text-gray-700 text-sm py-1">
            <Icon className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" aria-hidden="true" />
            <span className="font-medium mr-1">{label}:</span> {value}
        </div>
    );
};

// Компонент для отображения фичи (опции)
const FeatureItem: React.FC<{ feature: CarFeature }> = ({ feature }) => (
    <div className="flex items-center text-gray-700 text-sm py-0.5">
        {/* Используем цвет палитры */}
        <CheckIcon className="w-5 h-5 mr-2 text-teal-600 flex-shrink-0" aria-hidden="true" />
        <span>{feature.name}</span>
    </div>
);

// --- Функция для подбора иконки топлива ---
const getFuelIcon = (fuelType?: FuelType): React.ElementType | undefined => {
    switch (fuelType) {
        case FuelType.ELECTRIC: return BoltIcon;
        case FuelType.PETROL: case FuelType.DIESEL: case FuelType.GAS: case FuelType.HYBRID: return FireIcon;
        default: return undefined; // Возвращаем undefined, если тип не известен
    }
};

// --- Основной Компонент Страницы ---
const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const carId = id ? parseInt(id, 10) : NaN; // Преобразуем в число, проверяем на NaN

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Проверяем корректность carId
    if (isNaN(carId)) {
      setError('Некорректный ID автомобиля.');
      setLoading(false);
      return;
    }

    let isMounted = true;
    const loadCar = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCarById(carId); // Используем числовой ID
        if (isMounted) {
          setCar(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Не удалось загрузить информацию об автомобиле.');
        }
        console.error("Error loading car details:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCar();

    // Функция очистки для отмены обновления состояния при размонтировании
    return () => {
      isMounted = false;
    };
  }, [carId]); // Зависимость от числового carId

  // --- Рендеринг состояний загрузки и ошибки ---
  if (loading) {
    return <div className="container mx-auto text-center p-10 text-gray-500">Загрузка...</div>;
  }
  if (error) {
    return <div className="container mx-auto text-center p-10 text-red-600 bg-red-50 rounded border border-red-200">{error}</div>;
  }
  if (!car) {
    // Если не загрузка и не ошибка, но car все равно null
    return <div className="container mx-auto text-center p-10 text-gray-500">Автомобиль не найден.</div>;
  }

  // --- Подготовка данных для отображения (только если car не null) ---
  const transmissionText = car.transmission === TransmissionType.AUTOMATIC ? 'Автомат' : 'Механика';
  const fuelText = car.fuelType ? car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1) : undefined;
  const FuelIcon = getFuelIcon(car.fuelType);

  // --- Отображение данных автомобиля ---
  return (
    <div className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Кнопка Назад */}
        <div className="mb-6">
          <Link to="/cars" className="inline-flex items-center text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors">
            <ArrowLeftIcon className="w-4 h-4 mr-1" aria-hidden="true"/>
            Назад к списку автомобилей
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Левая колонка (Фото) */}
          <div className="lg:col-span-2">
            {car.imageUrl ? (
               <img
                  src={car.imageUrl}
                  alt={`Фото ${car.name}`}
                  className="w-full h-auto object-contain rounded-lg shadow-lg bg-gray-100 aspect-[16/10]" // Соотношение сторон
                  loading="lazy"
               />
             ) : (
                <div className="w-full aspect-[16/10] bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg shadow">Нет фото</div>
             )}
             {/* TODO: Галерея для авто */}
          </div>

          {/* Правая колонка (Информация и Бронирование) */}
          <div className="lg:col-span-1">
             <div className="bg-gray-50 p-6 rounded-lg shadow border border-gray-200 lg:sticky lg:top-24">
                {/* Название */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">{car.name}</h1>

                {/* Цена */}
                <div className="mb-5 pb-5 border-b border-gray-200">
                     <span className="text-3xl font-bold text-teal-700">
                          {typeof car.dailyPrice === 'number' ? `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(car.dailyPrice)}` : 'По запросу'}
                     </span>
                      {typeof car.dailyPrice === 'number' && ( <span className="text-base text-gray-500 ml-1">/ день</span> )}
                 </div>

                 {/* Характеристики */}
                 <div className="space-y-2 text-sm mb-5">
                    <h3 className="font-semibold text-gray-800 text-lg mb-2">Характеристики</h3>
                    <DetailItem icon={CogIcon} label="Коробка" value={transmissionText} />
                    {FuelIcon && <DetailItem icon={FuelIcon} label="Топливо" value={fuelText} />}
                    <DetailItem icon={UsersIcon} label="Мест" value={car.passengers} />
                    <DetailItem icon={CalendarDaysIcon} label="Год" value={car.year} />
                    <DetailItem icon={PaintBrushIcon} label="Цвет" value={car.color} />
                    <DetailItem icon={InformationCircleIcon} label="Двигатель" value={car.engineDescription} />
                 </div>

                 {/* Фичи (опции) */}
                 {car.features && car.features.length > 0 && (
                    <div className="mb-6 pt-5 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-800 text-lg mb-3">Опции</h4>
                        <ul className="space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                            {car.features.map((feature: CarFeature) => (
                                <li key={feature.id}><FeatureItem feature={feature} /></li>
                            ))}
                        </ul>
                    </div>
                 )}

                 {/* Кнопка Забронировать */}
                  <Link
                    to={`/booking-car?carId=${car.id}`} // Убедитесь, что этот роут будет создан
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Забронировать
                 </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;