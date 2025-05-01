// src/App.tsx
import React from 'react';
import HeroSlider from './components/HeroSlider'; 
import TourList from './components/TourList';  

function App() {
  return (
    <div className="w-full"> {/* Общий фон можно задать здесь */}
      
      <HeroSlider />

      {/* Список туров или другой контент под слайдером */}
      <main className="">
        
         <TourList />
      </main>

      {/* Здесь будет Footer */}
    </div>
  );
}

export default App;