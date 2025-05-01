// src/bookings/bookings.service.ts
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Tour } from '../tours/entities/tour.entity';
import { BookingStatus } from './entities/booking-status.entity';
import { ContactMethod } from './entities/contact-method.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(BookingStatus)
    private readonly statusRepository: Repository<BookingStatus>,
    @InjectRepository(ContactMethod)
    private readonly contactMethodRepository: Repository<ContactMethod>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { tourId, preferredContactMethodName, ...bookingData } = createBookingDto;

    // 1. Найти статус "Новая"
    const newStatus = await this.statusRepository.findOneBy({ code: 'new' });
    if (!newStatus) {
      console.error("Booking status 'new' not found in the database!");
      throw new InternalServerErrorException("System configuration error.");
    }

    // 2. Найти тур и подготовить значение для сущности
    let tourForEntity: Tour | undefined = undefined; // Инициализируем как undefined
    if (tourId) {
      const foundTour = await this.tourRepository.findOneBy({ id: tourId });
      if (!foundTour) { // Если не найден (foundTour === null)
        // Можно выбросить ошибку, как раньше:
         throw new NotFoundException(`Tour with ID "${tourId}" not found.`);
        // ИЛИ если мы хотим разрешить создание брони без тура, даже если ID был передан, но не найден:
        // tourForEntity = undefined; // Убеждаемся, что присваивается undefined
      } else { // Если найден (foundTour - это Tour)
        tourForEntity = foundTour; // Присваиваем найденный тур
      }
    }
    // Если tourId не был передан, tourForEntity останется undefined

    // 3. Найти способ связи
    let contactMethod: ContactMethod | undefined = undefined;
    if (preferredContactMethodName) {
        const foundMethod = await this.contactMethodRepository.findOneBy({ name: preferredContactMethodName });
         if (!foundMethod) {
            console.warn(`Contact method "${preferredContactMethodName}" not found.`);
         } else {
             contactMethod = foundMethod;
         }
    }

    // 4. Создать объект Booking
    const newBooking = this.bookingRepository.create({
      ...bookingData,
      status: newStatus,
      tour: tourForEntity,
      preferredContactMethod: contactMethod,
    });


    try {
      const savedBooking = await this.bookingRepository.save(newBooking);
      // TODO: Отправка уведомлений
      return savedBooking;
    } catch (error) {
      console.error("Error saving booking:", error);
      throw new BadRequestException('Could not save booking.');
    }
  }
}