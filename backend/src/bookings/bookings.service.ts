import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity'; // Убедитесь, что правильный путь
import { CreateBookingDto } from './dto/create-booking.dto'; // Убедитесь, что правильный путь
import { Tour } from '../tours/entities/tour.entity'; // Убедитесь, что правильный путь
import { BookingStatus } from './entities/booking-status.entity'; // Убедитесь, что правильный путь
import { ContactMethod } from './entities/contact-method.entity'; // Убедитесь, что правильный путь
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto'; // Импорт DTO для статуса

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

  // Метод для создания бронирования
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { tourId, preferredContactMethodName, ...bookingData } = createBookingDto;

    const newStatus = await this.statusRepository.findOneBy({ code: 'new' });
    if (!newStatus) {
      console.error("Booking status 'new' not found in the database!");
      throw new InternalServerErrorException('System configuration error.');
    }

    let tourForEntity: Tour | undefined = undefined;
    if (tourId) {
      const foundTour = await this.tourRepository.findOneBy({ id: tourId });
      if (!foundTour) {
        throw new NotFoundException(`Tour with ID "${tourId}" not found.`);
      }
      tourForEntity = foundTour;
    }

    let contactMethod: ContactMethod | undefined = undefined;
    if (preferredContactMethodName) {
      const foundMethod = await this.contactMethodRepository.findOneBy({
        name: preferredContactMethodName,
      });
      if (!foundMethod) {
        console.warn(
          `Contact method "${preferredContactMethodName}" not found.`,
        );
      } else {
        contactMethod = foundMethod;
      }
    }

    const newBooking = this.bookingRepository.create({
      ...bookingData,
      status: newStatus,
      tour: tourForEntity,
      preferredContactMethod: contactMethod,
      // booking_status_id и contact_method_id будут установлены TypeORM автоматически
    });

    try {
      const savedBooking = await this.bookingRepository.save(newBooking);
      // TODO: Отправка уведомлений администратору
      return savedBooking;
    } catch (error) {
      console.error('Error saving booking:', error);
      // Можно добавить более специфичную обработку ошибок БД
      throw new BadRequestException('Could not save booking.');
    }
  }

  // Метод для получения всех бронирований (админ)
  async findAllAdmin(): Promise<Booking[]> {
    return this.bookingRepository.find({
      // Eager: true в сущностях уже загружает статус и метод связи.
      // Дополнительно загружаем тур.
      relations: ['tour'],
      order: {
        createdAt: 'DESC', // Новые заявки сверху
      },
    });
  }

  // Метод для обновления статуса бронирования (админ)
  async updateStatus(
    id: number,
    updateDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    // 1. Найти бронирование
    const booking = await this.bookingRepository.findOne({
      where: { id },
       // Загружаем связи, чтобы вернуть полный объект и проверить текущий статус
      relations: ['status', 'tour', 'preferredContactMethod'],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID "${id}" not found.`);
    }

    // 2. Найти новый статус по коду
    const newStatus = await this.statusRepository.findOneBy({
      code: updateDto.statusCode,
    });
    if (!newStatus) {
      throw new BadRequestException(
        `Invalid status code "${updateDto.statusCode}" provided.`,
      );
    }

    // 3. Проверить, изменился ли статус
    // Сравниваем ID, так как объекты могут быть разными экземплярами
    if (booking.status && booking.status.id === newStatus.id) {
      // Статус не изменился
      return booking;
    }

    // 4. Обновить статус у сущности Booking
    booking.status = newStatus;
    // Не нужно вручную менять booking.booking_status_id

    // 5. Сохранить обновленное бронирование
    const updatedBooking = await this.bookingRepository.save(booking);

    // TODO: Отправка уведомления клиенту об изменении статуса?

    return updatedBooking;
  }
}