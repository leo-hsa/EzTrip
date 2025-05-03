// src/cars/cars.controller.ts
import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common'; // Добавили Query
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { FindCarsQueryDto } from './dto/find-cars-query.dto'; // Импорт DTO

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  // Заменяем старый findAll
  @Get()
  async findAll(@Query() query: FindCarsQueryDto): Promise<{ data: Car[], total: number }> {
     console.log('Fetching cars with query:', query);
     return this.carsService.findAllPaginated(query); // Вызываем новый метод
  }

  // findOne остается
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return this.carsService.findOne(id);
  }
}