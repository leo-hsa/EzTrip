// src/tours/tours.controller.ts
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './entities/tour.entity';

@Controller('tours') // Базовый путь для всех эндпоинтов в этом контроллере будет /tours
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get() // Обработчик для GET /tours
  findAll(): Promise<Tour[]> {
    console.log('Fetching all tours...'); // Для отладки
    return this.toursService.findAll();
  }

  // Эндпоинт для получения одного тура по ID
  // ParseUUIDPipe автоматически проверит, что id - это валидный UUID
  @Get(':id') // Обработчик для GET /tours/:id (где :id - параметр)
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Tour> {
     console.log(`Fetching tour with id: ${id}`); // Для отладки
    return this.toursService.findOne(id);
  }

  // --- Заглушки для будущих эндпоинтов ---
  // @Post()
  // create(@Body() createTourDto: /* CreateTourDto */ any) {
  //   return this.toursService.create(createTourDto);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateTourDto: /* UpdateTourDto */ any,
  // ) {
  //   return this.toursService.update(id, updateTourDto);
  // }

  // @Delete(':id')
  // @HttpCode(204) // No Content
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.toursService.remove(id);
  // }
}