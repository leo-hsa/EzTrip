import React from 'react';
// TODO: Импортировать иконку, если нужно: import { Bars3Icon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
    const navItems = [
        { name: 'Главная', href: '/' },
        { name: 'Экскурсии', href: '/tours' },
        { name: 'Услуги', href: '/services' },
        { name: 'Контакты', href: '/contact' },
        { name: 'О нас', href: '/about' },
    ];

  return (
    <header className="bg-white text-gray-700 shadow-sm sticky top-0 z-30">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Логотип */}
        <a href="/" className="text-2xl font-bold text-lime-600 hover:text-lime-700 transition-colors flex items-center">
           {/* Можно добавить иконку */}
           {/* <MapPinIcon className="h-6 w-6 mr-1 text-lime-500" /> */}
           <span className="text-3xl mr-1">📍</span> {/* Или Emoji */}
           EzTrip
        </a>

        
        <ul className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {navItems.map((item, index) => (
            <li key={item.name}>
              <a
                href={item.href}
                // Логика активной ссылки (пока только для Главной)
                className={`pb-1 border-b-2 transition-colors duration-200 ${
                    index === 0 // Замените на реальную проверку активного маршрута
                    ? 'text-lime-600 border-lime-600' // Стиль активной ссылки
                    : 'text-gray-700 border-transparent hover:text-lime-600 hover:border-lime-600' // Стиль неактивной ссылки
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        


       
        <button className="md:hidden text-gray-600 hover:text-lime-600 focus:outline-none">
           {/* Иконка бургер-меню */}
           {/* <Bars3Icon className="h-6 w-6" /> */}
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
           </svg>
        </button>
      </nav>
      {/* TODO: Здесь будет мобильное меню, которое появляется при клике на бургер */}
      {/* <div className="md:hidden bg-white shadow-lg"> ... ссылки ... </div> */}
    </header>
  );
};

export default Header;