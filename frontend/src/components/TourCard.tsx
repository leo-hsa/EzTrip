// src/components/TourCard.tsx
import React from 'react';
import { Tour } from '../types/tour'; // Импортируем тип

interface TourCardProps {
  tour: Tour; // Компонент принимает объект тура как пропс
}

// Примерная иконка по умолчанию, если не задана в бэкенде
const DefaultFeatureIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Изображение тура */}
      {tour.imageUrl ? (
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="w-full h-48 object-cover" // Задаем высоту и обрезку
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}

      {/* Основная информация */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate" title={tour.title}>
            {tour.title}
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Продолжительность:</span> {tour.durationText}
        </p>
        <p className="text-sm text-gray-500 mb-3">
           <span className="font-medium">Дни проведения:</span>{' '}
           {tour.operationDays.map(day => day.shortName).join(', ') || 'Не указаны'}
        </p>

        {/* Включенные услуги */}
        {tour.features && tour.features.length > 0 && (
            <div className="mb-4">
                 <p className="text-sm font-medium text-gray-600 mb-1">В стоимость тура включено:</p>
                 <ul className="text-sm text-gray-700 space-y-1">
                     {tour.features.slice(0, 4).map((feature) => ( // Показываем первые 4 для краткости
                         <li key={feature.id} className="flex items-center">
                             {/* Здесь можно добавить логику для разных иконок на основе feature.icon */}
                             <DefaultFeatureIcon />
                             {feature.name}
                         </li>
                     ))}
                     {tour.features.length > 4 && (
                        <li className='text-gray-500 italic'>... и другое</li>
                     )}
                 </ul>
            </div>
        )}

        {/* Цена */}
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            {/* Форматируем цену */}
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: tour.priceCurrency }).format(tour.price)}
          </p>
          <p className="text-xs text-gray-500">
            {tour.priceUnit === 'per_person' ? 'с человека' : 'за тур'}
          </p>
        </div>

        {/* Можно добавить кнопку "Подробнее" */}
        {/* <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Подробнее
        </button> */}
      </div>
    </div>
  );
};

export default TourCard;