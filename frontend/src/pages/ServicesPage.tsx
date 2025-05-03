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
  details: string[];
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
  {
    id: 1,
    iconName: 'GlobeAltIcon',
    title: 'Экскурсии по Турции',
    description: 'Любые виды экскурсий по Турции – от культурных и исторических туров до природных и экстремальных приключений.',
    details: [
      'Исторические туры по Стамбулу, Каппадокии и Эфесу с профессиональными гидами.',
      'Природные экскурсии: водопады, каньоны и пляжи Средиземного моря.',
      'Экстремальные приключения: параглайдинг, рафтинг и сафари на джипах.',
      'Индивидуальные маршруты с учетом ваших интересов и предпочтений.'
    ]
  },
  {
    id: 2,
    iconName: 'TruckIcon',
    title: 'Трансфер',
    description: 'Комфортный трансфер по Турции: из аэропорта, между городами или на экскурсии с опытными водителями.',
    details: [
      'Встреча в аэропорту с табличкой и помощь с багажом.',
      'Комфортабельные автомобили: от седанов до микроавтобусов для групп.',
      'Трансферы между городами, включая Анталию, Аланию, Кемер и Мармарис.',
      'Круглосуточная поддержка и гибкий график для вашего удобства.'
    ]
  },
  {
    id: 3,
    iconName: 'KeyIcon',
    title: 'Аренда авто',
    description: 'Аренда автомобилей на любой вкус и бюджет с доставкой по всему региону. Комфорт и свобода передвижения.',
    details: [
      'Широкий выбор автомобилей: от эконом-класса до внедорожников и люкс моделей.',
      'Доставка автомобиля в аэропорт, отель или любой другой адрес.',
      'Полная страховка и техническая поддержка на весь период аренды.',
      'Гибкие условия: аренда на день, неделю или месяц без скрытых платежей.'
    ]
  },
  {
    id: 4,
    iconName: 'HomeModernIcon',
    title: 'Аренда вил',
    description: 'Виллы по Турции – от уютных домов у моря до роскошных резиденций с бассейном и панорамными видами.',
    details: [
      'Виллы на побережье с прямым доступом к пляжу и видом на море.',
      'Роскошные резиденции с частными бассейнами и садами.',
      'Семейные дома с детскими площадками и зонами для барбекю.',
      'Полное обслуживание: уборка, трансфер и организация досуга.'
    ]
  },
  {
    id: 5,
    iconName: 'LifebuoyIcon',
    title: 'Аренда яхты',
    description: 'Приватные прогулки и вечеринки на яхтах с индивидуальными маршрутами и обслуживанием на высшем уровне.',
    details: [
      'Аренда яхт для романтических прогулок, вечеринок или семейного отдыха.',
      'Индивидуальные маршруты вдоль побережья с остановками для купания.',
      'Профессиональная команда: капитан, повар и обслуживающий персонал.',
      'Дополнительные услуги: водные виды спорта, кейтеринг и фото-сессии.'
    ]
  },
  {
    id: 6,
    iconName: 'HeartIcon',
    title: 'Медицина',
    description: 'Организация лечения в лучших клиниках Турции: диагностика, операции, стоматология и восстановление.',
    details: [
      'Полная диагностика организма с использованием современного оборудования.',
      'Хирургические операции: от косметической хирургии до сложных вмешательств.',
      'Стоматологические услуги: имплантация, отбеливание и ортодонтия.',
      'Программы восстановления: физиотерапия, реабилитация и спа-процедуры.'
    ]
  },
  {
    id: 7,
    iconName: 'CogIcon',
    title: 'Сервис',
    description: 'Выездной сервис: ремонт автомобилей и IT-услуги – от починки ПК до разработки программного обеспечения.',
    details: [
      'Ремонт автомобилей на месте: от замены шин до диагностики двигателя.',
      'IT-услуги: настройка компьютеров, установка программ и восстановление данных.',
      'Разработка программного обеспечения для бизнеса и частных клиентов.',
      'Круглосуточная техническая поддержка и выезд специалистов.'
    ]
  },
  {
    id: 8,
    iconName: 'UserGroupIcon',
    title: 'Гид',
    description: 'Профессиональные гиды по Турции, которые познакомят вас с историей, культурой и самыми интересными местами.',
    details: [
      'Лицензированные гиды с глубокими знаниями истории и культуры Турции.',
      'Экскурсии на разных языках: русском, английском, немецком и других.',
      'Персонализированные туры: от древних руин до современных достопримечательностей.',
      'Групповые и индивидуальные экскурсии с учетом ваших интересов.'
    ]
  },
];

const ServicesPage: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-lime-600 font-semibold text-sm tracking-widest uppercase relative inline-block px-4">
            <span className="absolute top-1/2 left-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 -translate-x-full"></span>
              УСЛУГИ
            <span className="absolute top-1/2 right-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 translate-x-full"></span>
          </span>
          <h2 className="text-4xl font-bold mt-3 text-gray-800">
            Наши услуги
          </h2>
        </div>

        <div className="space-y-12">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName];
            return (
              <div
                key={service.id}
                className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="inline-flex p-4 rounded-full bg-lime-100">
                    <IconComponent className="h-8 w-8 text-lime-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-lime-600 mr-2">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;