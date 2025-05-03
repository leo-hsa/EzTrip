// src/pages/ContactPage.tsx
import React from 'react';
// Импортируем иконки
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const ContactPage: React.FC = () => {
  // TODO: Добавить обработчик отправки формы
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Здесь будет логика отправки данных (например, POST запрос на бэкенд)
    alert('Форма отправлена (демо)!');
  };

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Заголовок страницы */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-lime-600 font-semibold text-sm tracking-widest uppercase relative inline-block px-4">
            <span className="absolute top-1/2 left-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 -translate-x-full"></span>
            КОНТАКТЫ
            <span className="absolute top-1/2 right-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 translate-x-full"></span>
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
            Свяжитесь с нами
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Мы всегда рады ответить на ваши вопросы и помочь с организацией поездки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
          {/* Левая колонка: Контактная информация */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Наши контакты</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <MapPinIcon className="w-6 h-6 text-lime-600 mr-3 mt-0.5 flex-shrink-0"/>
                  <div>
                    <strong className="block text-sm">Адрес:</strong>
                    123 Street, New York, USA
                  </div>
                </li>
                <li className="flex items-start">
                  <PhoneIcon className="w-6 h-6 text-lime-600 mr-3 mt-0.5 flex-shrink-0"/>
                   <div>
                    <strong className="block text-sm">Телефон:</strong>
                     <a href="tel:+123456789" className="hover:text-lime-700">+012 345 6789</a>
                   </div>
                </li>
                <li className="flex items-start">
                  <EnvelopeIcon className="w-6 h-6 text-lime-600 mr-3 mt-0.5 flex-shrink-0"/>
                  <div>
                    <strong className="block text-sm">E-mail:</strong>
                    <a href="mailto:mail@domain.com" className="hover:text-lime-700">mail@domain.com</a>
                  </div>
                </li>
              </ul>
            </div>
            {/* Можно добавить часы работы или карту */}
            {/* <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Часы работы</h3>
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб: 10:00 - 15:00</p>
              <p>Вс: Выходной</p>
            </div> */}
          </div>

          {/* Правая колонка: Форма обратной связи */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Отправить сообщение</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Ваш E-mail</label>
                <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                <textarea id="message" name="message" rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500"></textarea>
              </div>
              <div>
                 {/* Используем зеленую кнопку */}
                <button type="submit" className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2.5 px-4 rounded-md transition duration-300 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;