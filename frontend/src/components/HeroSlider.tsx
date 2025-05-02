import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Интерфейс для описания данных одного слайда
interface SlideData {
  id: number;
  imageUrl: string;
  titleLine1: string; // Разделим заголовок на строки
  titleLine2: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
}

// Новые данные для слайдов (ЗАМЕНИТЕ imageUrl!)
const slidesData: SlideData[] = [
  {
    id: 1,
    imageUrl: '/images/slider/slide1.jpg', // <-- Укажите путь к фото Кемера
    titleLine1: ' EzTrip',
    titleLine2: 'Экскурсии в Кемере',
    subtitle: 'Ваш лучший онлайн турагент',
    buttonText: 'Забронировать',
    buttonLink: '#booking', // Ссылка на секцию/страницу бронирования
  },
  {
    id: 2,
    imageUrl: '/images/slider/slide2.jpg', // <-- Укажите путь к фото Каппадокии
    titleLine1: 'Незабываемая',
    titleLine2: 'Каппадокия',
    subtitle: 'Полеты на воздушном шаре и уникальные пейзажи',
    buttonText: 'Забронировать',
    buttonLink: '#booking',
  },
  {
    id: 3,
    imageUrl: '/images/slider/slide3.jpg', // <-- Укажите путь к фото Стамбула
    titleLine1: 'Сокровища',
    titleLine2: 'Стамбула',
    subtitle: 'История и современность на берегах Босфора',
    buttonText: 'Забронировать',
    buttonLink: '#booking',
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden"> {/* Можно сделать высоту разной */}
      <div className="relative w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            {/* Оверлей для затемнения */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div> {/* Градиент снизу вверх */}

            {/* Контейнер для текста и кнопки, позиционируем */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
              {/* Заголовок */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-3 leading-tight drop-shadow-md">
                {slide.titleLine1}
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-5 leading-tight drop-shadow-md"> {/* Второй заголовок чуть ниже */}
                {slide.titleLine2}
              </h2>
              {/* Подзаголовок */}
              <p className="text-base sm:text-lg mb-8 font-light drop-shadow-sm">
                {slide.subtitle}
              </p>
              {/* Кнопка */}
              <a
                href={slide.buttonLink || '#'}
                // Ярко-желтый цвет кнопки
                className="bg-white hover:bg-lime-600 text-black hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-md text-base md:text-lg"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка "Назад" (без фона) */}
      <button
        onClick={goToPrevious}
        aria-label="Previous Slide"
        // Убираем фон, увеличиваем отступ, меняем цвет при наведении
        className="absolute top-1/2 left-4 md:left-6 transform -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer p-2"
      >
        <ChevronLeftIcon className="h-8 w-8 md:h-10 md:w-10" /> {/* Увеличили иконку */}
      </button>

      {/* Кнопка "Вперед" (без фона) */}
      <button
        onClick={goToNext}
        aria-label="Next Slide"
         // Убираем фон, увеличиваем отступ, меняем цвет при наведении
        className="absolute top-1/2 right-4 md:right-6 transform -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer p-2"
      >
        <ChevronRightIcon className="h-8 w-8 md:h-10 md:w-10" /> {/* Увеличили иконку */}
      </button>

     
    </div>
  );
};

export default HeroSlider;