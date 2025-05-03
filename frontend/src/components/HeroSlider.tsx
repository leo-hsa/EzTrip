// src/components/HeroSlider.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Интерфейс SlideData
interface SlideData {
    id: number;
    imageUrl: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
}

// ДАННЫЕ СЛАЙДОВ (ЗАМЕНИТЕ НА ВАШИ)
const slidesData: SlideData[] = [
    { id: 1, imageUrl: '/images/slider/slide1.jpg', titleLine1: 'Незабываемые', titleLine2: 'Впечатления', subtitle: 'Откройте лучшие туры и экскурсии по всему миру.' },
    { id: 2, imageUrl: '/images/slider/slide2.jpg', titleLine1: 'Ваше Путешествие', titleLine2: 'Начинается Здесь', subtitle: 'Найдите идеальное направление для вашего отдыха.' },
    { id: 3, imageUrl: '/images/slider/slide3.jpg', titleLine1: 'Исследуйте Мир', titleLine2: 'Вместе с EzTrip', subtitle: 'Бронируйте туры и арендуйте авто легко и быстро.' },
];

interface HeroSliderProps {
  onSearchClick: () => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ onSearchClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [searchTerm, setSearchTerm] = useState(''); // Убираем, если поиск только в модалке
  // const navigate = useNavigate(); // Убираем, если переход из модалки

  const goToPrevious = () => {
    // Добавим проверку на пустой массив для безопасности
    if (slidesData.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const goToNext = () => {
    // Добавим проверку на пустой массив для безопасности
    if (slidesData.length === 0) return;
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  // --- Получаем текущий слайд БЕЗОПАСНО ---
  const activeSlide = slidesData.length > 0 ? slidesData[currentSlide] : null;

  // Если нет слайдов, можно показать заглушку или ничего не рендерить
  if (!activeSlide) {
      return <div className="relative w-full h-[65vh] bg-gray-200 flex items-center justify-center text-gray-500">Нет слайдов для отображения</div>; // Пример заглушки
  }

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] overflow-hidden">
      {/* Слайды */}
      <div className="relative w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            // Используем activeSlide?.imageUrl для дополнительной безопасности
            style={{ backgroundImage: `url(${activeSlide?.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
          </div>
        ))}
         {/* Прелоадер для следующего/предыдущего слайда (опционально) */}
         {/* <link rel="preload" as="image" href={slidesData[(currentSlide + 1) % slidesData.length]?.imageUrl} />
         <link rel="preload" as="image" href={slidesData[(currentSlide - 1 + slidesData.length) % slidesData.length]?.imageUrl} /> */}
      </div>

      {/* Контент поверх слайдов */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
        {/* Заголовки (теперь используем activeSlide) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 leading-tight drop-shadow-md">
          {activeSlide.titleLine1}
        </h1>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-md text-lime-300">
          {activeSlide.titleLine2}
        </h2>
        <p className="text-base sm:text-lg mb-8 font-light drop-shadow-sm max-w-xl">
          {activeSlide.subtitle}
        </p>

        {/* Элемент, вызывающий поиск */}
        <button
            onClick={onSearchClick}
            className="w-full max-w-xl md:max-w-2xl relative bg-white/95 backdrop-blur-sm text-gray-500 py-3 pl-12 pr-4 rounded-full text-base shadow-lg text-left hover:bg-white transition-colors duration-200"
        >
            Куда вы хотите отправиться?
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </button>
      </div>

      {/* Кнопки навигации слайдера */}
       {/* Показываем кнопки только если слайдов больше одного */}
      {slidesData.length > 1 && (
          <>
             <button onClick={goToPrevious} aria-label="Previous Slide" className="absolute left-4 top-1/2 transform -translate-y-1/2  hover:bg-black/60 text-white p-3 rounded-full transition-colors z-30">
                <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button onClick={goToNext} aria-label="Next Slide" className="absolute right-4 top-1/2 transform -translate-y-1/2  hover:bg-black/60 text-white p-3 rounded-full transition-colors z-30">
                <ChevronRightIcon className="h-8 w-8" />
            </button>
          </>
      )}
    </div>
  );
};

export default HeroSlider;