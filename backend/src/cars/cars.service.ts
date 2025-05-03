// src/cars/cars.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { FindCarsQueryDto } from './dto/find-cars-query.dto'; // Импорт DTO

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  // Новый метод для поиска с пагинацией
  async findAllPaginated(queryDto: FindCarsQueryDto): Promise<{ data: Car[], total: number }> {
      const {
          search,
          limit = 10,
          offset = 0
          // TODO: Добавить другие фильтры
      } = queryDto;

      const queryBuilder = this.carRepository.createQueryBuilder('car');

      // Подключаем фичи, т.к. eager: true может не сработать с QueryBuilder
      queryBuilder.leftJoinAndSelect('car.features', 'features');

      // Фильтр по поиску (по названию)
      if (search) {
          queryBuilder.andWhere('LOWER(car.name) LIKE LOWER(:search)', { search: `%${search}%` });
      }

      // TODO: Добавить другие .andWhere() для фильтров

      // Сортировка (по умолчанию по названию)
      queryBuilder.orderBy('car.name', 'ASC');
      queryBuilder.addOrderBy('car.id', 'ASC'); // Для стабильности

      // Пагинация
      queryBuilder.skip(offset);
      queryBuilder.take(limit);

      const [data, total] = await queryBuilder.getManyAndCount();
      return { data, total };
  }


  // Метод findOne (без изменений)
  async findOne(id: number): Promise<Car> {
    // eager: true в entity должен загрузить features при использовании findOneBy
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car with ID "${id}" not found.`);
    }
    return car;
  }

  // TODO: CRUD для админки
}