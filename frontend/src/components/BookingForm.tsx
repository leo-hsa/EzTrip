
import React, { useState } from 'react';
import { CreateBookingDto } from '../types/dto'; 
import { createBooking } from '../services/api'; 



interface BookingFormProps {
  tourId?: string; 
  tourTitle?: string; 
  onSubmitSuccess?: () => void; 
}

const BookingForm: React.FC<BookingFormProps> = ({ tourId, tourTitle, onSubmitSuccess }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(tourTitle || ''); 
  const [contactMethod, setContactMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Состояния для отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Обработчик отправки формы
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвращаем стандартную отправку

    if (!agreed) {
      setError('Необходимо согласиться с политикой конфиденциальности.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const bookingData: CreateBookingDto = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      // Если service не редактируется и передан tourTitle, можно передавать tourId
      // selectedService: service, // Если у вас на бэкенде поле selectedService
      tourId: tourId, // Передаем ID тура, если он есть
      preferredContactMethodName: contactMethod || undefined, // Передаем название
      customerNotes: notes || undefined,
      agreedToPolicy: agreed,
    };

    try {
      await createBooking(bookingData);
      setSuccess(true);
      // Очистка формы (опционально)
      setName('');
      setEmail('');
      setPhone('');
      // setService(''); // Не очищаем, если предзаполнено
      setContactMethod('');
      setNotes('');
      setAgreed(false);
      // Вызываем колбэк, если он передан
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка при отправке.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100 max-w-lg mx-auto"> {/* Обертка и стили */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800 ">
        Забронировать
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Пожалуйста заполните все поля формы
      </p>

      {/* Отображение сообщений успеха или ошибки */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded text-sm">
          Ваша заявка успешно отправлена! Мы скоро с вами свяжемся.
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-200 rounded text-sm">
          Ошибка: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле E-mail */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
            Ваш E-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            placeholder="example@mail.com"
          />
        </div>

        {/* Поле ФИО */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ваше ФИО <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className=" text-black w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Иванов Иван Иванович"
          />
        </div>

        {/* Поле Телефон */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Ваш телефон <span className="text-red-500">*</span>
          </label>
          {/* TODO: Заменить на компонент выбора страны/маски телефона */}
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className=" text-black w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            placeholder="+7 (999) 999-99-99"
          />
        </div>

        {/* Поле Выберите услугу (если нужно и не предзаполнено) */}
        {/* Если название тура передано, можно просто отобразить его */}
        {tourTitle && (
             <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-sm font-medium text-gray-700">Выбранный тур:</p>
                <p className="text-sm text-gray-900">{tourTitle}</p>
            </div>
        )}
        {/* Если нужно выбирать услугу из списка: */}
        {/* <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            Выберите услугу
          </label>
          <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)} className="...">
            <option value="">-- Выберите --</option>
            <option value="Экскурсия Стамбул">Экскурсия Стамбул</option>
             <option value="Аренда авто">Аренда авто</option>
            {/* ... другие опции ... */}
          {/* </select>
        </div> */}


        {/* Поле Способ связи */}
        <div>
          <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-1">
            Предпочтительный способ связи
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            <option value="">-- Не выбрано --</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Звонок">Звонок</option>
            <option value="E-mail">E-mail</option>
          </select>
        </div>

       
        <div>
           <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Напишите что вас интересует
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Дополнительные пожелания, вопросы..."
          ></textarea>
        </div>

        {/* Чекбокс Политика конфиденциальности */}
        <div className="flex items-center">
          <input
            id="agreement"
            name="agreement"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required // Делаем обязательным
            className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
          />
          <label htmlFor="agreement" className="ml-2 block text-xs sm:text-sm text-gray-700">
            Я согласен с <a href="/privacy-policy" target="_blank" className="underline hover:text-teal-600">политикой конфиденциальности</a> <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Кнопка Отправить */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold transition duration-150 ease-in-out ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500 text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500' // Ярко-желтая кнопка
            }`}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;