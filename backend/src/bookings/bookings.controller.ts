// src/bookings/bookings.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Controller('bookings') // Базовый путь /bookings
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post() // Обработчик для POST /bookings
  @HttpCode(HttpStatus.CREATED) // Устанавливаем статус ответа 201 Created
  async create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    // Валидация DTO происходит автоматически благодаря ValidationPipe в main.ts
    return this.bookingsService.create(createBookingDto);
    
  }
}