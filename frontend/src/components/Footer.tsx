// src/components/Footer.tsx
import React from 'react';
// Импортируем иконки
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
// Для соц. сетей могут понадобиться иконки брендов
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Светлый фон, темный текст, граница сверху
    <footer className="bg-white text-gray-600 pt-12 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Секция 1: Лого и описание */}
          <div className="sm:col-span-2 md:col-span-1">
             {/* Логотип - бирюзовый */}
            <a href="/" className="text-2xl font-bold text-teal-600 mb-4 inline-block"> {/* Цвет лого */}
              EzTrip
            </a>
            <p className="text-sm mb-4 text-gray-700"> {/* Основной текст */}
              Ваш надежный партнер в мире путешествий.
            </p>
             <div className="flex space-x-4">
                 {/* Иконки соц. сетей - серые, при наведении коралловые */}
                 {/* TODO: Заменить на реальные SVG иконки */}
                 <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-orange-500 transition-colors">F</a>
                 <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-orange-500 transition-colors">T</a>
                 <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-orange-500 transition-colors">L</a>
                 <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-orange-500 transition-colors">I</a>
             </div>
          </div>

          {/* Секция 2: Навигация */}
          <div>
            {/* Заголовок - темный */}
            <h5 className="text-gray-800 font-semibold mb-4 text-base">Навигация</h5>
            <ul className="space-y-2 text-sm">
              {/* Ссылки - серые, при наведении бирюзовые */}
              <li><a href="/" className="hover:text-teal-600 transition-colors">Главная</a></li>
              <li><a href="/tours" className="hover:text-teal-600 transition-colors">Экскурсии</a></li>
              <li><a href="/services" className="hover:text-teal-600 transition-colors">Услуги</a></li>
              <li><a href="/contact" className="hover:text-teal-600 transition-colors">Контакты</a></li>
              <li><a href="/about" className="hover:text-teal-600 transition-colors">О нас</a></li>
            </ul>
          </div>

          {/* Секция 3: Контакты */}
          <div>
            <h5 className="text-gray-800 font-semibold mb-4 text-base">Контакты</h5>
            <ul className="space-y-3 text-sm text-gray-700"> {/* Основной текст */}
              <li className="flex items-start">
                  {/* Иконки - бирюзовые */}
                  <MapPinIcon className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0"/>
                  <span>123 Street, New York, USA</span>
              </li>
              <li className="flex items-start">
                   <PhoneIcon className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0"/>
                   <span>+012 345 6789</span>
              </li>
               <li className="flex items-start">
                   <EnvelopeIcon className="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0"/>
                   <span>mail@domain.com</span>
              </li>
            </ul>
          </div>

        
         
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-500"> {/* Светлая граница и текст */}
          <p>
            © {currentYear} EzTrip. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;