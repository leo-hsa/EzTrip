// src/components/HeroSlider.tsx
import React, { useState, useEffect } from 'react';

// Интерфейс для описания данных одного слайда
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

// Данные для наших слайдов (замените imageUrl на ваши)
const slidesData: SlideData[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80', // Каппадокия
    title: 'Тур в Каппадокию',
    subtitle: 'Ваше воздушное приключение',
    button1Text: 'О Каппадокии',
    button2Text: 'Заказать Тур',
    button1Link: '#about-cappadocia', // Замените на реальные ссылки или обработчики
    button2Link: '#book-tour',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80', // Париж
    title: 'Выходные в Париже',
    subtitle: 'Романтика у Эйфелевой башни',
    button1Text: 'Подробнее',
    button2Text: 'Выбрать даты',
    button1Link: '#paris-details',
    button2Link: '#paris-booking',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80', // Рим
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

  // Опционально: Автоматическая смена слайдов
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     goToNext();
  //   }, 5000); // Смена каждые 5 секунд
  //   return () => clearTimeout(timer); // Очистка таймера при размонтировании или смене слайда
  // }, [currentSlide]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden"> {/* Высота слайдера */}
      {/* Контейнер для слайдов */}
      <div className="relative w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.imageUrl})` }} // Устанавливаем фон
          >
            {/* Оверлей для затемнения фона и читаемости текста */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-white text-lg md:text-xl mb-8 drop-shadow-md">
                {slide.subtitle}
              </p>
              {/* Кнопки */}
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

      {/* Кнопка "Назад" */}
      <button
        onClick={goToPrevious}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Кнопка "Вперед" */}
      <button
        onClick={goToNext}
        aria-label="Next Slide"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Опционально: Точки навигации */}
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