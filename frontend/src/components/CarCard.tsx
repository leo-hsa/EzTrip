import React from 'react';
import { Link } from 'react-router-dom';
import { Car, TransmissionType, FuelType, CarFeature } from '../types'; // Убедитесь, что все типы экспортируются из ../types или отдельных файлов
import {
    UsersIcon,
    CogIcon,
    BoltIcon, // Электро
    FireIcon, // Бензин/Дизель/Газ/Гибрид
    CheckIcon,
} from '@heroicons/react/24/outline'; // Используем outline для характеристик

interface CarCardProps {
    car: Car;
}

// Компонент для отображения характеристики (значка)
const CarSpecBadge: React.FC<{ icon: React.ElementType; text: string | number | undefined }> = ({ icon: Icon, text }) => {
    if (text === undefined || text === null || text === '') return null;
    return (
        <span className="inline-flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full mr-2 mb-1.5">
            <Icon className="w-4 h-4 mr-1 text-gray-500" />
            {text}
        </span>
    );
};

// Подбираем иконку для типа топлива
const getFuelIcon = (fuelType?: FuelType) => {
    switch (fuelType) {
        case FuelType.ELECTRIC: return BoltIcon;
        case FuelType.PETROL:
        case FuelType.DIESEL:
        case FuelType.GAS:
        case FuelType.HYBRID:
            return FireIcon;
        default: return FireIcon; // Иконка по умолчанию
    }
};

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    // Преобразуем Enum в читаемый текст
    const transmissionText = car.transmission === TransmissionType.AUTOMATIC ? 'Автомат' : 'Механика';
    // Получаем иконку для топлива
    const fuelIcon = getFuelIcon(car.fuelType);
    // Форматируем название типа топлива для отображения
    const fuelText = car.fuelType ? car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1) : undefined;

  return (
    // Карточка с тенью, скруглением и эффектом при наведении
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out h-full group">
        {/* Изображение как ссылка */}
        <Link to={`/cars/${car.id}`} className="block relative w-full h-48 flex-shrink-0 overflow-hidden bg-gray-100">
            {car.imageUrl ? (
                <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 p-2" // contain для авто
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Фото нет</div>
            )}
        </Link>

        {/* Основной контент */}
        <div className="p-4 flex flex-col flex-grow">
            {/* Название как ссылка */}
            <Link to={`/cars/${car.id}`} className="block mb-2">
                 <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors leading-tight truncate" title={car.name}>
                     {car.name}
                 </h3>
            </Link>

            {/* Характеристики (значки) */}
            <div className="flex flex-wrap mb-3">
                <CarSpecBadge icon={CogIcon} text={transmissionText} />
                <CarSpecBadge icon={fuelIcon} text={fuelText} />
                {car.passengers && <CarSpecBadge icon={UsersIcon} text={`${car.passengers} мест`} />}
                {/* Добавьте другие значки, если нужно */}
            </div>

             {/* Фичи (Включенные опции) */}
             {car.features && car.features.length > 0 && (
                <div className="mb-4">
                    {/* <p className="text-xs font-medium text-gray-500 mb-1.5">Опции:</p> */}
                    <div className="flex flex-wrap gap-1.5">
                        {/* Отображаем первые несколько фич */}
                        {car.features.slice(0, 3).map((feature: CarFeature) => ( // Типизируем feature
                             <span key={feature.id} className="inline-flex items-center bg-teal-50 text-teal-700 text-xs font-medium px-2 py-0.5 rounded-full" title={feature.name}>
                                <CheckIcon className="w-3 h-3 mr-1 text-teal-500" />
                                <span className="truncate max-w-[100px]">{feature.name}</span> {/* Ограничим ширину */}
                            </span>
                        ))}
                         {car.features.length > 3 && <span className="text-xs text-gray-400 italic ml-1">...</span>}
                    </div>
                </div>
             )}


            {/* Цена и кнопка */}
            <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                {/* Цена */}
                <div>
                    {typeof car.dailyPrice === 'number' ? (
                        <>
                            <span className="text-xl font-bold text-gray-800">
                                {/* Форматируем цену */}
                                {new Intl.NumberFormat('ru-RU', { // Локаль для формата
                                    style: 'currency',
                                    currency: car.priceCurrency || 'USD',
                                    minimumFractionDigits: 0, // Без копеек/центов
                                    maximumFractionDigits: 0
                                }).format(car.dailyPrice)}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">/ день</span>
                        </>
                    ) : (
                        <span className="text-sm text-gray-500">Цена по запросу</span>
                    )}
                </div>
                 {/* Кнопка Забронировать - коралловый цвет */}
                 <Link
                    to={`/booking-car?carId=${car.id}`} // TODO: Убедитесь, что страница booking-car существует
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-1.5 px-4 rounded-md transition duration-300 whitespace-nowrap shadow-sm"
                 >
                    Бронь
                 </Link>
            </div>
        </div>
    </div>
  );
};

export default CarCard;