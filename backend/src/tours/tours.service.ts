// src/tours/tours.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { FindToursQueryDto, TourSortBy } from './dto/find-tours-query.dto';
// Импортируем другие сущности, если они нужны для связей в findOne
import { Weekday } from '../weekdays/entities/weekday.entity';
import { Feature } from '../features/entities/feature.entity';
import { Category } from '../categories/entities/category.entity'; // Убедитесь, что Category импортирована

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    // Репозитории для других сущностей могут не понадобиться здесь,
    // если мы загружаем связи через relations или QueryBuilder
    // @InjectRepository(Weekday)
    // private readonly weekdayRepository: Repository<Weekday>,
    // @InjectRepository(Feature)
    // private readonly featureRepository: Repository<Feature>,
    // @InjectRepository(Category)
    // private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAllPaginated(queryDto: FindToursQueryDto): Promise<{ data: Tour[], total: number }> {
    const {
        search,
        category: categorySlug, // Переименуем для ясности
        minPrice,
        maxPrice,
        // minDuration, // Раскомментируйте, если добавите фильтр по длительности
        // maxDuration,
        sortBy = TourSortBy.DATE_DESC,
        limit = 10,
        offset = 0
    } = queryDto;

    const queryBuilder = this.tourRepository.createQueryBuilder('tour');

    // Подключаем связи (joins)
    // Обязательно 'category', так как она используется в фильтре и, вероятно, в отображении
    queryBuilder.leftJoinAndSelect('tour.category', 'category');
    // Подключаем остальные связи, если они нужны для отображения списка туров
    // (Если не нужны, их можно убрать для оптимизации запроса списка)
    queryBuilder.leftJoinAndSelect('tour.operationDays', 'operationDays');
    queryBuilder.leftJoinAndSelect('tour.features', 'features');
    // Связь bookings обычно не нужна в списке туров
    // queryBuilder.leftJoinAndSelect('tour.bookings', 'bookings');

    // --- Применение Фильтров ---
    if (search) {
      // Поиск без учета регистра по названию тура
      queryBuilder.andWhere('LOWER(tour.title) LIKE LOWER(:search)', { search: `%${search}%` });
      // Раскомментируйте, если хотите искать и в описании:
      // queryBuilder.andWhere(
      //   '(LOWER(tour.title) LIKE LOWER(:search) OR LOWER(tour.description) LIKE LOWER(:search))',
      //   { search: `%${search}%` }
      // );
    }

    if (categorySlug) {
      // Фильтр по слагу категории
      queryBuilder.andWhere('category.slug = :categorySlug', { categorySlug });
    }

    if (minPrice !== undefined) {
      queryBuilder.andWhere('tour.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      queryBuilder.andWhere('tour.price <= :maxPrice', { maxPrice });
    }

    /* Раскомментируйте, если добавите числовое поле durationDays в Tour entity
    if (minDuration !== undefined) {
        queryBuilder.andWhere('tour.durationDays >= :minDuration', { minDuration });
    }
    if (maxDuration !== undefined) {
        queryBuilder.andWhere('tour.durationDays <= :maxDuration', { maxDuration });
    }
    */

    // --- Применение Сортировки ---
    switch (sortBy) {
        case TourSortBy.PRICE_ASC:
            queryBuilder.orderBy('tour.price', 'ASC');
            break;
        case TourSortBy.PRICE_DESC:
            queryBuilder.orderBy('tour.price', 'DESC');
            break;
        case TourSortBy.DATE_DESC:
        default:
            queryBuilder.orderBy('tour.createdAt', 'DESC');
            break;
    }
    // Добавляем вторую сортировку по ID для стабильности порядка при одинаковых значениях основного поля сортировки
    queryBuilder.addOrderBy('tour.id', 'ASC');

    // --- Применение Пагинации ---
    queryBuilder.skip(offset);
    queryBuilder.take(limit);

    // --- Получение Результатов ---
    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }

  async findOne(id: string): Promise<Tour> {
    // При поиске одного тура важно загрузить все нужные связи
    const tour = await this.tourRepository.findOne({
       where: { id },
       relations: [
           'category',        // Загружаем категорию
           'operationDays',   // Загружаем дни проведения
           'features'         // Загружаем включенные услуги
           // 'bookings'      // Бронирования обычно не нужны здесь, или загружаются отдельно
        ],
    });
    if (!tour) {
      throw new NotFoundException(`Tour with ID "${id}" not found`);
    }
    return tour;
  }

  // --- Место для будущих методов CRUD ---
  // async create(createTourDto: CreateTourDto): Promise<Tour> { ... }
  // async update(id: string, updateTourDto: UpdateTourDto): Promise<Tour> { ... }
  // async remove(id: string): Promise<void> { ... }

} // Конец класса ToursService