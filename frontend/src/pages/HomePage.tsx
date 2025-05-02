// src/pages/HomePage.tsx
import React from 'react';
import HeroSlider from '../components/HeroSlider'; 
import TourList from '../components/TourList';   
import OurServices from '../components/OurServices';
import EasySteps from '../components/EasySteps';
import BookingForm from '../components/BookingForm';

const HomePage: React.FC = () => {
  return (
    <> 
      <HeroSlider />

 
      <div className="py-10 md:py-16 bg-gray-50"> 
        <main className="container mx-auto px-4 ">
      
          <div className="text-center mb-10">
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


          <OurServices />


          <EasySteps />


          <section id="booking" className="py-10 md:py-16 bg-gray-100"> {/* Даем ID */}
          <div className="container mx-auto px-4">
               {/* Форма без ID тура */}
              <BookingForm onSubmitSuccess={() => alert('Заявка отправлена!')} />
          </div>
      </section>
        </main>
      </div>
      {/* Здесь можно добавить другие секции для главной страницы */}
    </>
  );
};

export default HomePage;