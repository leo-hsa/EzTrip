// src/tours/tours.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { Tour } from './entities/tour.entity';
import { Weekday } from '../weekdays/entities/weekday.entity'; // <-- Импорт
import { Feature } from '../features/entities/feature.entity'; // <-- Импорт

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour, Weekday, Feature]), // <-- Добавляем Weekday и Feature
  ],
  controllers: [ToursController],
  providers: [ToursService],
  // exports: [ToursService] // Можно экспортировать сервис, если он нужен в других модулях
})
export class ToursModule {}