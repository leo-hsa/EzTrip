// src/pages/HomePage.tsx
import React, { useState } from 'react'; // Добавили useState
import HeroSlider from '../components/HeroSlider';
import OurServices from '../components/OurServices';
import EasySteps from '../components/EasySteps';
import TourList from '../components/TourList';
import SearchModal from '../components/SearchModal'; // <-- Импортируем модалку

const HomePage: React.FC = () => {
  // Состояние для управления видимостью модального окна
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Функции для открытия/закрытия модального окна
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  return (
    <>
      {/* Передаем функцию открытия в HeroSlider */}
      <HeroSlider onSearchClick={openSearchModal} />
      <div className="py-10 md:py-16 bg-white">
        <main className="container mx-auto px-4">
          {/* ... заголовок ... */}
          <div className="text-center mb-10 md:mb-12">
            <span className="text-lime-600 font-semibold text-sm tracking-widest uppercase relative inline-block px-4">
               <span className="absolute top-1/2 left-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 -translate-x-full"></span>
                 ЭКСКУРСИИ
               <span className="absolute top-1/2 right-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 translate-x-full"></span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
                Каталог туров
            </h2>
          </div>
          <TourList />
        </main>
      </div>
      <OurServices />
      <EasySteps />

      {/* Секция Популярных Туров */}
      

      {/* Рендерим модальное окно */}
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </>
  );
};

export default HomePage;