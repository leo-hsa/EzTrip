// src/pages/TourDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tour } from '../types'; // Импортируем тип Tour
import { fetchTourById } from '../services/api';
import { ArrowLeftIcon, CalendarDaysIcon, MapPinIcon, CheckIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline'; // Добавим иконки
// Импортируем компоненты, если они вынесены, или определяем здесь
// import { FeatureLineDetail } from '../components/FeatureLineDetail'; // Пример

// Компонент строки для включенных услуг (можно взять из TourCard или создать свой)
const FeatureLineDetail: React.FC<{ feature: { name: string } }> = ({ feature }) => (
    <div className="flex items-center text-sm text-gray-700"> {/* Уменьшил размер */}
        <CheckIcon className="w-4 h-4 mr-2 text-teal-600 flex-shrink-0" />
        <span>{feature.name}</span>
    </div>
);

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID из URL
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Состояние для хранения URL выбранного большого изображения
  const [mainImageUrl, setMainImageUrl] = useState<string | null | undefined>(null);

  useEffect(() => {
    if (!id) {
      setError('Не указан ID тура.');
      setLoading(false);
      return;
    }
    let isMounted = true; // Флаг для отмены обновления стейта
    const loadTour = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTourById(id);
        if (isMounted) {
          setTour(data);
          // Устанавливаем начальное главное изображение (либо из карточки, либо первое из галереи)
          setMainImageUrl(data.cardImageUrl || (data.galleryImageUrls && data.galleryImageUrls[0]) || null);
        }
      } catch (err: any) {
         if (isMounted) {
            setError(err.message || 'Не удалось загрузить информацию о туре.');
         }
        console.error("Error loading tour details:", err);
      } finally {
         if (isMounted) setLoading(false);
      }
    };
    loadTour();
    return () => { isMounted = false; }; // Очистка при размонтировании
  }, [id]);

  // Обработчик клика по миниатюре галереи
  const handleThumbnailClick = (url: string) => {
    setMainImageUrl(url);
  };

  // --- Рендеринг ---
  if (loading) {
    return <div className="container mx-auto text-center p-10">Загрузка информации о туре...</div>;
  }

  if (error) {
    return <div className="container mx-auto text-center p-10 text-red-600">{error}</div>;
  }

  if (!tour) {
    return <div className="container mx-auto text-center p-10">Тур не найден.</div>;
  }

  // --- Отображение данных тура ---
  return (
    <div className="bg-white py-8 md:py-12"> {/* Белый фон для секции */}
      <div className="container mx-auto px-4">

        {/* Кнопка Назад (можно стилизовать иначе) */}
        <div className="mb-6">
          <Link to="/tours" className="inline-flex items-center text-sm text-teal-600 hover:text-teal-800 font-medium">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Все туры
          </Link>
        </div>

        {/* Заголовок тура (опционально, можно разместить в колонке) */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">{tour.title}</h1>


        {/* Основной контент: Сетка 2 колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

          {/* Левая колонка (Описание, Детали, Услуги) */}
          <div className="lg:col-span-2">
            <section>
                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Краткое описание</h2>
                 {/* Используем Tailwind Typography для стилизации текста */}
                 <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">
                    {tour.description ? (
                        <p>{tour.description}</p> // Или рендерить HTML, если нужно
                    ) : (
                        <p>Описание тура скоро будет добавлено.</p>
                    )}
                 </div>
            </section>

             {/* Детали тура (Длительность, Дни и т.д.) */}
             <section className="mt-8 pt-6 border-t border-gray-200">
                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Детали поездки</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                     <div className="flex items-center text-gray-700">
                         <CalendarDaysIcon className="w-5 h-5 mr-2 text-teal-600"/>
                         <span className="font-medium mr-1">Длительность:</span> {tour.durationText || '-'}
                     </div>
                     <div className="flex items-center text-gray-700">
                         <ClockIcon className="w-5 h-5 mr-2 text-teal-600"/> {/* Иконка дней проведения */}
                         <span className="font-medium mr-1">Дни проведения:</span>
                          {tour.operationDays && tour.operationDays.length > 0
                            ? tour.operationDays.map(day => day.shortName).join(', ')
                            : 'Уточняйте'}
                     </div>
                      <div className="flex items-center text-gray-700">
                         <MapPinIcon className="w-5 h-5 mr-2 text-teal-600"/>
                         <span className="font-medium mr-1">Локация:</span> {tour.location || '-'}
                     </div>
                     {/* Добавить другие детали, если нужно */}
                 </div>
             </section>

             {/* Включенные услуги */}
            {tour.features && tour.features.length > 0 && (
                 <section className="mt-8 pt-6 border-t border-gray-200">
                     <h3 className="text-xl font-semibold text-gray-800 mb-4">Включено в стоимость</h3>
                     <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1"> {/* Сетка для услуг */}
                         {tour.features.map((feature) => (
                             <li key={feature.id}><FeatureLineDetail feature={feature} /></li>
                         ))}
                     </ul>
                 </section>
             )}
          </div>

          {/* Правая колонка (Изображение и Галерея) */}
          <div className="lg:col-span-1">
            {/* Основное изображение */}
             {mainImageUrl ? (
               <img
                  src={mainImageUrl}
                  alt={`Фото ${tour.title}`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"
               />
             ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg shadow mb-4">Нет изображения</div>
             )}

             {/* Миниатюры галереи */}
             {tour.galleryImageUrls && tour.galleryImageUrls.length > 1 && ( // Показываем только если > 1 фото
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {/* Добавляем основное фото как первую миниатюру, если оно есть */}
                  {tour.cardImageUrl && (
                      <button onClick={() => handleThumbnailClick(tour.cardImageUrl!)} className={`block border-2 rounded overflow-hidden ${mainImageUrl === tour.cardImageUrl ? 'border-teal-500' : 'border-transparent hover:border-gray-300'}`}>
                          <img src={tour.cardImageUrl} alt="Thumbnail main" className="w-full h-16 object-cover"/>
                      </button>
                  )}
                  {/* Остальные фото галереи */}
                  {tour.galleryImageUrls.map((url, index) => (
                     // Исключаем дубликат основного фото, если оно есть в галерее
                     url !== tour.cardImageUrl && (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(url)}
                            // Выделяем активную миниатюру
                            className={`block border-2 rounded overflow-hidden ${mainImageUrl === url ? 'border-teal-500' : 'border-transparent hover:border-gray-300'}`}
                        >
                            <img
                                src={url}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-16 object-cover" // Фиксированная высота миниатюр
                                loading="lazy"
                            />
                        </button>
                     )
                  ))}
                </div>
             )}

              {/* Кнопка Забронировать (можно разместить здесь или в основной колонке) */}
             <div className="mt-8 sticky top-24"> {/* Делаем кнопку прилипающей */}
                 <Link
                    to={`/booking?tourId=${tour.id}`}
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-lg shadow-md"
                 >
                     Забронировать тур
                 </Link>
                  {/* Можно добавить блок с ценой сюда же */}
                  <div className="mt-4 text-center">
                     <span className="text-2xl font-bold text-gray-900">
                          {typeof tour.price === 'number' ? `$${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(tour.price)}` : 'По запросу'}
                     </span>
                      {typeof tour.price === 'number' && (
                         <span className="text-sm text-gray-500 ml-1">
                             {tour.priceUnit === 'per_person' ? '/ с человека' : '/ за группу'}
                         </span>
                     )}
                 </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;