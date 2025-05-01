import React from 'react';
import { Tour } from '../types/tour';
// Импортируем иконки
import { MapPinIcon, CalendarDaysIcon, CheckIcon, StarIcon } from '@heroicons/react/24/outline';
// Для звезд лучше использовать solid версию
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface TourCardProps {
  tour: Tour;
}

// Компонент для звезд рейтинга
const StarRating: React.FC<{ rating?: number }> = ({ rating = 5 }) => (
    <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
            // Отображаем solid иконку
            <StarIconSolid key={i} className="h-4 w-4" />
            // Если нужно будет показывать рейтинг (например 4.5),
            // потребуется более сложная логика с частичным заполнением или разными иконками
        ))}
    </div>
);

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 ease-in-out h-full">
      {/* Изображение */}
      <div className="relative w-full h-48 flex-shrink-0">
        {tour.imageUrl ? (
          <img src={tour.imageUrl} alt={`Фото ${tour.title}`} className="w-full h-full object-cover" loading="lazy"/>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Фото нет</div>
        )}
         {tour.category && tour.category.name && (
             <span className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded shadow"> {/* Бирюзовый */}
                 {tour.category.name}
             </span>
         )}
      </div>

       {/* Блок с иконками под фото */}
       <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-start flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600"> {/* Добавили flex-wrap и gap */}
            <span className="flex items-center whitespace-nowrap">
                <MapPinIcon className="h-4 w-4 mr-1 text-teal-600 flex-shrink-0"/> {/* Бирюзовый */}
                {tour.location || 'N/A'}
            </span>
             <span className="flex items-center whitespace-nowrap">
                <CalendarDaysIcon className="h-4 w-4 mr-1 text-teal-600 flex-shrink-0"/> {/* Бирюзовый */}
                {tour.durationText || 'N/A'}
            </span>
             {/* Пример для группы (если будет поле) */}
             {/* <span className="flex items-center whitespace-nowrap">
                 <UsersIcon className="h-4 w-4 mr-1 text-teal-600"/>
                 {tour.groupSize || 'N/A'} Person
             </span> */}
       </div>

      {/* Основной контент */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
            {/* Используем h4 т.к. h3 уже был выше */}
            <h4 className="text-xl font-bold text-gray-800">
                {typeof tour.price === 'number' ? (
                     new Intl.NumberFormat('en-US', { style: 'currency', currency: tour.priceCurrency || 'USD', minimumFractionDigits: 0 }).format(tour.price)
                ) : ('По запросу')}
            </h4>
            <StarRating />
        </div>

        {/* Текст "В стоимость тура входит" и список */}
        {tour.features && tour.features.length > 0 && (
            <>
                <p className="text-xs text-gray-500 mb-1 mt-2">В стоимость тура входит:</p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                    {tour.features.slice(0, 2).map((feature) => ( // Показываем 2
                        <li key={feature.id} className="flex items-center">
                            <CheckIcon className="h-4 w-4 mr-1.5 text-teal-500 flex-shrink-0" /> {/* Бирюзовый */}
                            <span className="truncate" title={feature.name}>{feature.name}</span>
                        </li>
                    ))}
                    {tour.features.length > 2 && (
                        <li className='text-gray-500 italic text-xs'>... и другое</li>
                    )}
                </ul>
            </>
        )}

        {/* Кнопки действий */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex space-x-2">
            {/* Кнопка Read More - стиль как на примере (светлая) */}
            <a href={`/tours/${tour.id}`} className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 px-3 rounded-md transition duration-300">
                {tour.category?.name ? `О ${tour.category.name}` : 'Подробнее'}
            </a>
             {/* Кнопка Book Now - коралловый (оранжевый) */}
            <a href={`/booking?tourId=${tour.id}`} className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 px-3 rounded-md transition duration-300">
                Заказать тур
            </a>
        </div>
      </div>
    </div>
  );
};

export default TourCard;