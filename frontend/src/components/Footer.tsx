import React from 'react';
// Импортируем иконки
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
// Для соц. сетей могут понадобиться иконки брендов, их нет в heroicons/outline
// Можно использовать react-icons: import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Секция 1: Лого и описание */}
          <div className="sm:col-span-2 md:col-span-1">
            <a href="/" className="text-2xl font-bold text-teal-500 mb-4 inline-block"> {/* Бирюзовый */}
              EzTrip
            </a>
            <p className="text-sm mb-4">
              Ваш надежный партнер в мире путешествий.
            </p>
             <div className="flex space-x-4">
                 {/* TODO: Заменить на реальные иконки соц. сетей */}
                 <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-orange-500 transition-colors">F</a>
                 <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-orange-500 transition-colors">T</a>
                 <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-orange-500 transition-colors">L</a>
                 <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-orange-500 transition-colors">I</a>
             </div>
          </div>

          {/* Секция 2: Навигация */}
          <div>
            <h5 className="text-white font-semibold mb-4 text-base">Навигация</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-teal-500 transition-colors">Главная</a></li> {/* Бирюзовый при наведении */}
              <li><a href="/tours" className="hover:text-teal-500 transition-colors">Экскурсии</a></li>
              <li><a href="/services" className="hover:text-teal-500 transition-colors">Услуги</a></li>
              <li><a href="/contact" className="hover:text-teal-500 transition-colors">Контакты</a></li>
              <li><a href="/about" className="hover:text-teal-500 transition-colors">О нас</a></li>
            </ul>
          </div>

          {/* Секция 3: Контакты */}
          <div>
            <h5 className="text-white font-semibold mb-4 text-base">Контакты</h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                  {/* Иконка бирюзовая */}
                  <MapPinIcon className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0"/>
                  <span>123 Street, New York, USA</span>
              </li>
              <li className="flex items-start">
                   <PhoneIcon className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0"/>
                   <span>+012 345 6789</span>
              </li>
               <li className="flex items-start">
                   <EnvelopeIcon className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0"/>
                   <span>mail@domain.com</span>
              </li>
            </ul>
          </div>

          {/* Секция 4: Newsletter */}
          <div>
            <h5 className="text-white font-semibold mb-4 text-base">Подписка на новости</h5>
            <p className="text-sm mb-3">Получайте лучшие предложения первыми!</p>
            <form>
                  {/* Фокус инпута - бирюзовый */}
                 <input type="email" placeholder="Ваш E-mail" required className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2 placeholder-gray-400"/>
                 {/* Кнопка - коралловый (оранжевый) */}
                 <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500">
                     Подписаться
                 </button>
            </form>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-gray-700 pt-6 text-center text-xs">
          <p>
            © {currentYear} EzTrip. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;