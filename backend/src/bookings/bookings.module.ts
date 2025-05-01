// src/bookings/bookings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { Tour } from '../tours/entities/tour.entity';
import { BookingStatus } from './entities/booking-status.entity'; 
import { ContactMethod } from './entities/contact-method.entity'; 

@Module({
  imports: [
    
    TypeOrmModule.forFeature([Booking, Tour, BookingStatus, ContactMethod]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}