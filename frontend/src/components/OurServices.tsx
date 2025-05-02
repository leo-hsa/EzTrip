// src/components/OurServices.tsx
import React from 'react';
import {
  GlobeAltIcon,
  TruckIcon,    
  KeyIcon,
  HomeModernIcon,
  LifebuoyIcon,
  HeartIcon,
  CogIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: number;
  iconName: keyof typeof iconMap; 
  title: string;
  description: string;
}

const iconMap = {
  GlobeAltIcon,
  TruckIcon,
  KeyIcon,
  HomeModernIcon,
  LifebuoyIcon,
  HeartIcon,
  CogIcon,
  UserGroupIcon,
};

const servicesData: Service[] = [
  { id: 1, iconName: 'GlobeAltIcon', title: 'Экскурсии по Турции', description: 'Любые виды экскурсий по Турции – от культурных и исторических туров до природных и экстремальных приключений.' },
  { id: 2, iconName: 'TruckIcon', title: 'Трансфер', description: 'Комфортный трансфер по Турции: из аэропорта, между городами или на экскурсии с опытными водителями.' },
  { id: 3, iconName: 'KeyIcon', title: 'Аренда авто', description: 'Аренда автомобилей на любой вкус и бюджет с доставкой по всему региону. Комфорт и свобода передвижения.' },
  { id: 4, iconName: 'HomeModernIcon', title: 'Аренда вил', description: 'Виллы по Турции – от уютных домов у моря до роскошных резиденций с бассейном и панорамными видами.' },
  { id: 5, iconName: 'LifebuoyIcon', title: 'Аренда яхты', description: 'Приватные прогулки и вечеринки на яхтах с индивидуальными маршрутами и обслуживанием на высшем уровне.' },
  { id: 6, iconName: 'HeartIcon', title: 'Медицина', description: 'Организация лечения в лучших клиниках Турции: диагностика, операции, стоматология и восстановление.' },
  { id: 7, iconName: 'CogIcon', title: 'Сервис', description: 'Выездной сервис: ремонт автомобилей и IT-услуги – от починки ПК до разработки программного обеспечения.' },
  { id: 8, iconName: 'UserGroupIcon', title: 'Гид', description: 'Профессиональные гиды по Турции, которые познакомят вас с историей, культурой и самыми интересными местами.' },
];

const OurServices: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white"> 
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-lime-600 font-semibold text-sm tracking-widest uppercase relative inline-block px-4">
            <span className="absolute top-1/2 left-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 -translate-x-full"></span>
              УСЛУГИ
            <span className="absolute top-1/2 right-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 translate-x-full"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
            Наши услуги
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName];
            return (
              <div
                key={service.id}
                className="rounded-lg p-6 text-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-100 cursor-pointer hover:bg-lime-600 hover:text-white"
              >
                <div className="inline-flex p-4 rounded-full mb-4 bg-lime-100 hover:bg-white/20 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-lime-600 hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
