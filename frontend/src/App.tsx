// src/App.tsx
import React from 'react';
// Добавляем useSearchParams в импорт из react-router-dom
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TourDetailPage from './pages/TourDetailPage'; // Убедитесь, что он импортирован
import ToursPage from './pages/ToursPage'; // Убедитесь, что он импортирован
import CarsPage from './pages/CarsPage'; 
import CarDetailPage from './pages/CarDetailPage'; 
import ServicesPage from './pages/ServicesPage'; 
import ContactPage from './pages/ContactPage'; // <-- Импортируем
import AboutPage from './pages/AboutPage';   // <-- Импортируем


const NotFoundPage = () => <div className="container mx-auto p-8 text-center min-h-[50vh]"><h1>404 - Страница не найдена</h1></div>;

// --- Компонент-заглушка для ПОИСКА ---
const SearchResultsPage = () => {
    // Используем useSearchParams из react-router-dom
    const [searchParams] = useSearchParams(); // <--- ИСПРАВЛЕНО ЗДЕСЬ
    const query = searchParams.get('q'); // Получаем параметр 'q' из URL

    // TODO: Добавить useEffect для загрузки данных поиска при изменении query

    return (
        <div className="container mx-auto p-8 min-h-[50vh]">
            <h1 className="text-2xl font-bold mb-4">
                {query ? `Результаты поиска: "${query}"` : 'Поиск'} {/* Показываем запрос */}
            </h1>
            {/* TODO: Здесь будет логика загрузки и отображения результатов поиска */}
            <p>Загрузка результатов для "{query}"...</p> {/* Показываем, что ищем */}
        </div>
    );
};


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarsPage />} /> 
            <Route path="/cars/:id" element={<CarDetailPage />} /> 
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:id" element={<TourDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;