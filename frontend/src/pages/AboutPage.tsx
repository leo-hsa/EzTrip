// src/pages/AboutPage.tsx
import React from 'react';
// Иконки для секции преимуществ (пример)
import { CheckBadgeIcon, UserGroupIcon, GlobeEuropeAfricaIcon, HeartIcon } from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  // Данные для секции преимуществ (пример)
  const advantages = [
      { icon: GlobeEuropeAfricaIcon, title: 'Широкий выбор', text: 'Предлагаем туры и услуги по всей Турции и не только.' },
      { icon: CheckBadgeIcon, title: 'Надежность', text: 'Работаем только с проверенными партнерами и отелями.' },
      { icon: UserGroupIcon, title: 'Профессионализм', text: 'Наша команда – опытные менеджеры и гиды.' },
      { icon: HeartIcon, title: 'Забота о клиентах', text: 'Индивидуальный подход и поддержка на всех этапах.' },
  ];

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Заголовок страницы */}
        <div className="text-center mb-10 md:mb-12">
           <span className="text-lime-600 font-semibold text-sm tracking-widest uppercase relative inline-block px-4">
                <span className="absolute top-1/2 left-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 -translate-x-full"></span>
                О КОМПАНИИ
                <span className="absolute top-1/2 right-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 translate-x-full"></span>
           </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
              О EzTrip
          </h1>
           <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
              Узнайте больше о нашей миссии, команде и почему тысячи туристов выбирают нас для своих путешествий.
           </p>
        </div>

        {/* Секция с текстом и картинкой */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Наша История</h2>
                {/* Используем Tailwind Typography для стилизации текста */}
                <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                        EzTrip был основан группой энтузиастов путешествий с одной целью: сделать организацию отдыха простой, доступной и увлекательной. Мы начали с небольшого офиса и нескольких направлений, но благодаря доверию наших клиентов и упорной работе, выросли в полноценное туристическое агентство.
                    </p>
                    <p>
                        Мы верим, что путешествия обогащают жизнь, расширяют кругозор и дарят незабываемые эмоции. Наша миссия - помочь вам открыть для себя красоту мира, предлагая качественный сервис и интересные маршруты по привлекательным ценам.
                    </p>
                    <p>
                        Каждый тур, каждая услуга тщательно продуманы нашей командой профессионалов, которые сами обожают путешествовать и знают, что нужно для идеального отдыха.
                    </p>
                </div>
            </div>
            <div>
                 {/* TODO: Заменить на реальное фото команды или офиса */}
                 <img
                    src="/images/about-us.jpg" // Пример пути из папки public
                    alt="О компании EzTrip"
                    className="rounded-lg shadow-lg w-full h-auto object-cover aspect-square md:aspect-video"
                 />
            </div>
        </div>

        {/* Секция Преимуществ */}
         <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Почему выбирают нас?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {advantages.map((adv, index) => {
                      const Icon = adv.icon;
                      return (
                          <div key={index} className="text-center">
                              <div className="inline-flex p-3 rounded-full bg-lime-100 mb-3">
                                 <Icon className="h-7 w-7 text-lime-600" />
                              </div>
                              <h4 className="font-semibold text-gray-800 mb-1">{adv.title}</h4>
                              <p className="text-sm text-gray-600">{adv.text}</p>
                          </div>
                      );
                  })}
              </div>
         </div>

      </div>
    </div>
  );
};

export default AboutPage;