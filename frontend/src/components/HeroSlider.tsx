import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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

const slidesData: SlideData[] = [
  {
    id: 1,
    imageUrl: '/images/slider/slide1.jpg',
    title: 'Тур в Каппадокию',
    subtitle: 'Ваше воздушное приключение',
    button1Text: 'О Каппадокии',
    button2Text: 'Заказать Тур',
    button1Link: '#about-cappadocia',
    button2Link: '#book-tour',
  },
  {
    id: 2,
    imageUrl: '/images/slider/slide2.jpg',
    title: 'Выходные в Париже',
    subtitle: 'Романтика у Эйфелевой башни',
    button1Text: 'Подробнее',
    button2Text: 'Выбрать даты',
    button1Link: '#paris-details',
    button2Link: '#paris-booking',
  },
  {
    id: 3,
    imageUrl: '/images/slider/slide3.jpg',
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
    <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
      <div className="relative w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/40">
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-white text-lg md:text-xl mb-8 drop-shadow-lg max-w-xl">
                {slide.subtitle}
              </p>
              <div className="space-x-4">
                {slide.button1Text && (
                  <a
                    href={slide.button1Link || '#'}
                    className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out shadow-md text-sm md:text-base"
                  >
                    {slide.button1Text}
                  </a>
                )}
                {slide.button2Text && (
                  <a
                    href={slide.button2Link || '#'}
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition duration-300 ease-in-out shadow-md text-sm md:text-base"
                  >
                    {slide.button2Text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
  onClick={goToPrevious}
  aria-label="Previous Slide"
  className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20 text-white hover:text-teal-300 transition duration-300 cursor-pointer"
>
  <ChevronLeftIcon className="h-10 w-10" />
</button>

<button
  onClick={goToNext}
  aria-label="Next Slide"
  className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20 text-white hover:text-teal-300 transition duration-300 cursor-pointer"
>
  <ChevronRightIcon className="h-10 w-10" />
</button>
    </div>
  );
};

export default HeroSlider;
