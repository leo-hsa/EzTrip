// src/components/EasySteps.tsx
import React from 'react';
// Импортируем иконки
import {
    GlobeAltIcon,
    CurrencyDollarIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline';

interface Step {
    id: number;
    iconName: keyof typeof stepIconMap;
    title: string;
    description: string;
}

// Маппинг имен иконок на компоненты
const stepIconMap = {
  GlobeAltIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
};

// Данные для шагов
const stepsData: Step[] = [
  { id: 1, iconName: 'GlobeAltIcon', title: 'Выберите Направление', description: 'Найдите идеальный тур или экскурсию из нашего каталога, изучите детали и отзывы.' },
  { id: 2, iconName: 'CurrencyDollarIcon', title: 'Забронируйте Онлайн', description: 'Заполните простую форму бронирования, указав ваши данные и пожелания к поездке.' },
  { id: 3, iconName: 'PaperAirplaneIcon', title: 'Наслаждайтесь Отдыхом', description: 'Получите подтверждение и все необходимые документы. Отправляйтесь в незабываемое путешествие!' },
];


const EasySteps: React.FC = () => {
    return (
        // Секция с белым фоном или очень светлым серым
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
             
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-lime-600 font-semibold text-sm tracking-widest uppercase relative inline-block px-4">
                        <span className="absolute top-1/2 left-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 -translate-x-full"></span>
                        ПРОЦЕСС
                        <span className="absolute top-1/2 right-0 w-8 h-px bg-lime-300 transform -translate-y-1/2 translate-x-full"></span>
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
                        3 Простых Шага
                    </h2>
                </div>

                
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-8">
                  
                    <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-lime-200 -z-0" style={{ top: '2.5rem' }}></div> {/* Линия позади кругов */}


                    {stepsData.map((step, index) => {
                        const IconComponent = stepIconMap[step.iconName];
                        return (
                            <div key={step.id} className="relative flex flex-col items-center text-center px-4">
                                {/* Круг с иконкой */}
                                <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-lime-600 text-white rounded-full shadow-lg mb-4">
                                    <IconComponent className="w-10 h-10"/>
                                </div>
                                {/* Текстовый блок */}
                                <div className="relative pt-8 border-t border-lime-300 w-full"> {/* Граница сверху */}
                                    {/* Соединительная точка для линии сверху (для десктопа) */}
                                    <div className="hidden md:block absolute left-1/2 top-0 w-2 h-2 bg-lime-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                     {/* Тонкая линия под заголовком */}
                                    <div className="w-12 h-px bg-lime-300 mx-auto mt-3 mb-1"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default EasySteps;