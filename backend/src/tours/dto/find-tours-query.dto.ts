// src/tours/dto/find-tours-query.dto.ts
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min, IsIn, IsNumber } from 'class-validator';

export enum TourSortBy {
    PRICE_ASC = 'price_asc',
    PRICE_DESC = 'price_desc',
    DATE_DESC = 'date_desc', // По дате создания (новые)
    // Можно добавить 'popularity_desc' позже
}

export class FindToursQueryDto {
    @IsOptional()
    @IsString()
    search?: string; // Поиск по названию

    @IsOptional()
    @IsString() // Принимаем slug категории
    category?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number) // Преобразовать строку из query в число
    @Min(0)
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    maxPrice?: number;

    // Фильтр по продолжительности (пример: в днях)
    // Нужно будет добавить поле durationDays (INT) в Tour entity
    // @IsOptional()
    // @IsInt()
    // @Type(() => Number)
    // @Min(1)
    // minDuration?: number;

    // @IsOptional()
    // @IsInt()
    // @Type(() => Number)
    // @Min(1)
    // maxDuration?: number;

    @IsOptional()
    @IsIn(Object.values(TourSortBy)) // Проверяем, что значение одно из допустимых
    sortBy?: TourSortBy = TourSortBy.DATE_DESC; // Сортировка по умолчанию

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    limit?: number = 10; // Лимит по умолчанию

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset?: number = 0; // Смещение по умолчанию (для кнопки "Загрузить еще")
}