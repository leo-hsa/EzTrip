import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards, // Импорт UseGuards
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BasicAuthGuard } from '../auth/guards/basic-auth.guard'; // Убедитесь, что путь верный

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // --- Публичный эндпоинт создания бронирования ---
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    // Валидация DTO происходит автоматически, если ValidationPipe глобальный
    return this.bookingsService.create(createBookingDto);
  }

  // --- "Административный" эндпоинт для получения всех бронирований ---
  @Get('/admin')
  @UseGuards(BasicAuthGuard) // Защищаем эндпоинт
  async findAllAdmin(): Promise<Booking[]> {
    return this.bookingsService.findAllAdmin();
  }

  // --- "Административный" эндпоинт для обновления статуса ---
  @Patch('/admin/:id/status')
  @UseGuards(BasicAuthGuard) // Защищаем эндпоинт
  async updateStatus(
    // ParseIntPipe преобразует :id из строки в число и проверяет, что это число
    @Param('id', ParseIntPipe) id: number,
    // Валидация DTO происходит автоматически
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    return this.bookingsService.updateStatus(id, updateBookingStatusDto);
  }
}