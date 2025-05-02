// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TourDetailPage from './pages/TourDetailPage'; 

// Заглушки
const AboutPage = () => <div className="container mx-auto p-8 text-center min-h-[50vh]"><h1>О Нас</h1><p>Страница в разработке...</p></div>;
const ServicesPage = () => <div className="container mx-auto p-8 text-center min-h-[50vh]"><h1>Услуги</h1><p>Страница в разработке...</p></div>;
const ToursPage = () => <div className="container mx-auto p-8 text-center min-h-[50vh]"><h1>Все Туры</h1><p>Здесь будет полный список туров с фильтрами</p></div>;
const ContactPage = () => <div className="container mx-auto p-8 text-center min-h-[50vh]"><h1>Контакты</h1><p>Страница в разработке...</p></div>;
const NotFoundPage = () => <div className="container mx-auto p-8 text-center min-h-[50vh]"><h1>404 - Страница не найдена</h1></div>; // Страница 404

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans"> 
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/tours" element={<ToursPage />} />
            {/* --- НОВЫЙ МАРШРУТ --- */}
            {/* Используем :id как параметр, он будет доступен в компоненте */}
            <Route path="/tours/:id" element={<TourDetailPage />} />
            {/* -------------------- */}
            <Route path="/contact" element={<ContactPage />} />
            {/* Маршрут для 404 - должен быть последним */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
         {/* TODO: Кнопка "Наверх" */}
      </div>
    </Router>
  );
}

export default App;