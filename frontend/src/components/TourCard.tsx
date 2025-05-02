import React from 'react';
import { Link } from 'react-router-dom';
import { Tour, Weekday, Feature } from '../types';
import {
    MapPinIcon,
    CalendarDaysIcon,
    CheckIcon,
    UserGroupIcon,
    TruckIcon,
    TicketIcon,
    BuildingOffice2Icon,
    PaperAirplaneIcon,
    LifebuoyIcon,
    ShoppingBagIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface TourCardProps {
  tour: Tour;
}

interface InfoLineProps {
  icon: React.ElementType;
  text: string | React.ReactNode;
}
const InfoLine: React.FC<InfoLineProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center text-xs text-gray-600 mb-1">
    <Icon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
    <span>{text}</span>
  </div>
);

interface FeatureLineProps {
  feature: Feature;
}
const featureIconMap: { [key: string]: React.ElementType } = {
    'transfer': TruckIcon,
    'tickets': TicketIcon,
    'guide': UserIcon,
    'food': ShoppingBagIcon,
    'hotel': BuildingOffice2Icon,
    'flight': PaperAirplaneIcon,
    'yacht': LifebuoyIcon,
    'default': CheckIcon,
};
const FeatureLine: React.FC<FeatureLineProps> = ({ feature }) => {
    const getIconByName = (name: string): React.ElementType => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('трансфер')) return featureIconMap['transfer'];
        if (lowerName.includes('билет')) return featureIconMap['tickets'];
        if (lowerName.includes('гид')) return featureIconMap['guide'];
        if (lowerName.includes('обед') || lowerName.includes('завтрак') || lowerName.includes('ужин') || lowerName.includes('питание')) return featureIconMap['food'];
        if (lowerName.includes('отел')) return featureIconMap['hotel'];
        if (lowerName.includes('перелет')) return featureIconMap['flight'];
        if (lowerName.includes('яхт')) return featureIconMap['yacht'];
        return featureIconMap['default'];
    };
    const IconComponent = getIconByName(feature.name);
    return (
      <div className="flex items-center text-xs text-gray-700">
        <IconComponent className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
        <span title={feature.name}>{feature.name}</span>
      </div>
    );
};

const StarRating: React.FC<{ rating?: number }> = ({ rating = 5 }) => (
    <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => ( <StarIconSolid key={i} className="h-4 w-4" /> ))} {/* Можете заменить на динамическое */}
    </div>
);

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const imgUrl = tour.cardImageUrl ?? tour.cardImageUrl ?? ''; 
  const operationDays = tour.operationDays ?? [];
  const features = tour.features ?? [];

  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-100 h-full group">
        <Link to={`/tours/${tour.id}`} className="block relative w-full h-48 flex-shrink-0 overflow-hidden">
            {imgUrl ? (
              <img src={imgUrl} alt={`Фото ${tour.title}`} className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" loading="lazy" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Фото нет</div>
            )}
            {tour.category?.name && (
              <span className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded shadow z-10">
                {tour.category.name}
              </span>
            )}
        </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/tours/${tour.id}`} className="block mb-3">
            <h3 className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-teal-600 transition-colors">
              {tour.title}
            </h3>
        </Link>

        <div className="mb-3">
            <InfoLine icon={CalendarDaysIcon} text={tour.durationText || 'Не указана'} />
            <InfoLine
              icon={UserGroupIcon}
              text={
                operationDays.length > 0
                  ? operationDays.map((day: Weekday) => day.shortName).join(', ')
                  : 'Уточняйте у менеджера'
              }
            />
        </div>

        {features.length > 0 && (
          <div className="mb-4">
              <p className="text-sm font-medium text-gray-800 mb-2">В стоимость тура входит:</p>
              <ul className="space-y-1.5">
                  {features.slice(0, 4).map((feature: Feature) => (
                      <li key={feature.id}>
                          <FeatureLine feature={feature} />
                      </li>
                  ))}
                  {features.length > 4 && (
                      <li className='text-gray-500 italic text-xs mt-1'>... и другое</li>
                  )}
              </ul>
          </div>
        )}

        <div className="flex justify-start items-center mt-auto pt-3">
            <p className="text-3xl font-bold text-gray-900 mr-2">
                {typeof tour.price === 'string' || typeof tour.price === 'number'
                  ? `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(tour.price))}`
                  : 'По запросу'}
            </p>
            {(tour.price && tour.priceUnit) && (
              <span className="text-sm text-gray-500 self-end pb-1">
                  {tour.priceUnit === 'per_person' ? 'с человека' : '/ за группу'}
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
