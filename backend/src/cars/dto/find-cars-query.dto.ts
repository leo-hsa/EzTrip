// src/cars/dto/find-cars-query.dto.ts
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

// TODO: Добавить Enum для сортировки, если нужно

export class FindCarsQueryDto {
    @IsOptional()
    @IsString()
    search?: string; // Поиск по названию

    // TODO: Добавить другие фильтры (transmission, fuelType, price, passengers)

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    offset?: number = 0;
}