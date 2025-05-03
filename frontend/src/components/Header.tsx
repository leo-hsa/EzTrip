import React from 'react';
import { NavLink } from 'react-router-dom'; // <-- Импортируем NavLink
// TODO: Импортировать иконку бургер-меню: import { Bars3Icon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
    // Определяем пункты навигации с точными путями для NavLink
    const navItems = [
        { name: 'Главная', href: '/' },
        { name: 'Экскурсии', href: '/tours' },
        { name: 'Аренда Авто', href: '/cars' }, // Добавили ссылку на машины
        { name: 'Услуги', href: '/services' },
        { name: 'Контакты', href: '/contact' },
        { name: 'О нас', href: '/about' },
    ];

  return (
    <header className="bg-white text-gray-700 shadow-sm sticky top-0 z-30">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Логотип */}
        <a href="/" className="text-2xl font-bold text-lime-600 hover:text-lime-700 transition-colors flex items-center">
           <span className="text-3xl mr-1">📍</span>
           EzTrip
        </a>

        {/* Навигационные ссылки (Десктоп) */}
        <ul className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              {/* Используем NavLink вместо <a> */}
              <NavLink
                to={item.href} // Используем 'to' вместо 'href'
                // Функция для определения классов активной и неактивной ссылки
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-colors duration-200 ${
                    isActive
                      ? 'text-lime-600 border-lime-600' // Стиль активной ссылки
                      : 'text-gray-700 border-transparent hover:text-lime-600 hover:border-lime-600' // Стиль неактивной ссылки
                  }`
                }
                // end пропс для '/' чтобы он не был активен для /tours, /about и т.д.
                end={item.href === '/'}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Placeholder для выравнивания, если навигация должна быть по центру */}
         


        {/* Кнопка бургер-меню (Мобильные) */}
        {/* TODO: Добавить обработчик onClick и логику открытия/закрытия меню */}
        <button className="md:hidden text-gray-600 hover:text-lime-600 focus:outline-none">
           {/* <Bars3Icon className="h-6 w-6" /> */}
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
           </svg>
        </button>
      </nav>
      {/* TODO: Мобильное меню */}
    </header>
  );
};

export default Header;