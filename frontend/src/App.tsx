// src/App.tsx
import React from 'react';
import HeroSlider from './components/HeroSlider'; // Импортируем слайдер
import TourList from './components/TourList';   // Импортируем список туров

function App() {
  return (
    <div className="App bg-gray-100"> {/* Общий фон можно задать здесь */}
      {/* Здесь будет Header */}

      {/* Наш слайдер */}
      <HeroSlider />

      {/* Список туров или другой контент под слайдером */}
      <main className="container mx-auto p-4 mt-[-50px] relative z-10">
         {/* mt-[-50px] и relative z-10 - чтобы контент немного "заехал" на слайдер, если нужно */}
         {/* Если не нужно, уберите эти классы из main */}
         {/* Можно добавить секцию с заголовком перед TourList */}
         <TourList />
      </main>

      {/* Здесь будет Footer */}
    </div>
  );
}

export default App;