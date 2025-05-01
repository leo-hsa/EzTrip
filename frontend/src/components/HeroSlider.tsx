// src/components/HeroSlider.tsx
import React, { useState, useEffect } from 'react';

interface SlideData {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  button1Text?: string;
  button2Text?: string;
  button1Link?: string;
  button2Link?: string;
}

// --- ВНИМАТЕЛЬНО ПРОВЕРЬТЕ И ЗАМЕНИТЕ ИМЕНА ФАЙЛОВ ---
const slidesData: SlideData[] = [
  {
    id: 1,
    // Пример: если ваш файл называется cappadocia-main.jpg
    // imageUrl: '/images/slider/cappadocia-main.jpg',
    imageUrl: '/images/slider/slide1.jpg', // <-- ЗАМЕНИТЕ НА РЕАЛЬНОЕ ИМЯ И РАСШИРЕНИЕ
    title: 'Тур в Каппадокию',
    subtitle: 'Ваше воздушное приключение',
    button1Text: 'О Каппадокии',
    button2Text: 'Заказать Тур',
    button1Link: '#about-cappadocia',
    button2Link: '#book-tour',
  },
  {
    id: 2,
    // Пример: если ваш файл называется paris-evening.png
    // imageUrl: '/images/slider/paris-evening.png',
    imageUrl: '/images/slider/slide2.jpg', // <-- ЗАМЕНИТЕ НА РЕАЛЬНОЕ ИМЯ И РАСШИРЕНИЕ
    title: 'Выходные в Париже',
    subtitle: 'Романтика у Эйфелевой башни',
    button1Text: 'Подробнее',
    button2Text: 'Выбрать даты',
    button1Link: '#paris-details',
    button2Link: '#paris-booking',
  },
  {
    id: 3,
    // Пример: если ваш файл называется rome-colosseum.webp
    // imageUrl: '/images/slider/rome-colosseum.webp',
    imageUrl: '/images/slider/slide3.jpg', // <-- ЗАМЕНИТЕ НА РЕАЛЬНОЕ ИМЯ И РАСШИРЕНИЕ
    title: 'Величие Древнего Рима',
    subtitle: 'Колизей, Форум и история веков',
    button1Text: 'Узнать больше',
    button2Text: 'Забронировать',
    button1Link: '#rome-info',
    button2Link: '#rome-tickets',
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
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-900"> {}
      <div className="relative w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${ // Добавили bg-cover bg-center
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-white text-lg md:text-xl mb-8 drop-shadow-md">
                {slide.subtitle}
              </p>
              <div>
                {slide.button1Text && (
                  <a
                    href={slide.button1Link || '#'}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out mr-4"
                  >
                    {slide.button1Text}
                  </a>
                )}
                {slide.button2Text && (
                  <a
                    href={slide.button2Link || '#'}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out"
                  >
                    {slide.button2Text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки и точки навигации остаются без изменений */}
       <button
        onClick={goToPrevious}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        aria-label="Next Slide"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slidesData.map((_, index) => (
              <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full ${
                      index === currentSlide ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
                  } hover:bg-white transition-colors duration-300`}
              />
          ))}
      </div>
    </div>
  );
};

export default HeroSlider;