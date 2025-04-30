// src/tours/tours.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { Feature } from '../features/entities/feature.entity'; // Может понадобиться для создания/обновления
import { Weekday } from '../weekdays/entities/weekday.entity'; // Может понадобиться для создания/обновления

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    // Опционально: внедрить репозитории для Weekday и Feature,
    // если нужно будет искать/создавать их отдельно при создании/обновлении тура
    @InjectRepository(Weekday)
    private readonly weekdayRepository: Repository<Weekday>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async findAll(): Promise<Tour[]> {
    // Используем опцию relations для загрузки связанных данных
    return this.tourRepository.find({
      relations: ['operationDays', 'features'], // Указываем имена свойств из Tour Entity
      order: { createdAt: 'DESC' } // Пример сортировки по дате создания
    });
  }

  async findOne(id: string): Promise<Tour> {
    const tour = await this.tourRepository.findOne({
       where: { id },
       relations: ['operationDays', 'features'], // Также загружаем связи для одного тура
    });
    if (!tour) {
      throw new NotFoundException(`Tour with ID "${id}" not found`);
    }
    return tour;
  }

  // --- Создание и Обновление станут сложнее ---
  // Примерная логика для создания (нужен DTO с weekdayIds и featureIds)
  // async create(createTourDto: /* CreateTourDto */ any): Promise<Tour> {
  //   const { weekdayIds, featureIds, ...restTourData } = createTourDto;
  //
  //   const operationDays = await this.weekdayRepository.findByIds(weekdayIds || []);
  //   const features = await this.featureRepository.findByIds(featureIds || []);
  //
  //   const newTour = this.tourRepository.create({
  //     ...restTourData,
  //     operationDays, // Присваиваем найденные сущности
  //     features,      // Присваиваем найденные сущности
  //   });
  //
  //   return this.tourRepository.save(newTour); // TypeORM сам обновит связующие таблицы
  // }

  // Логика обновления будет похожа

  // async remove(id: string): Promise<void> { ... } // Остается без изменений
}