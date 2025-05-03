// src/cars/cars.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { CarFeature } from './entities/car-feature.entity'; // Импорт

@Module({
  // Регистрируем обе сущности
  imports: [TypeOrmModule.forFeature([Car, CarFeature])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [TypeOrmModule, CarsService] // Экспортируем, если понадобится в других модулях
})
export class CarsModule {}