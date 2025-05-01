import { IsString, IsNotEmpty, IsIn } from 'class-validator';
// Предполагаем, что BookingStatus enum экспортируется из booking.entity
// Если нет, нужно импортировать отдельно созданный Enum или просто использовать строки
// import { BookingStatusCode } from '../constants'; // Пример импорта констант

// Либо определяем допустимые статусы прямо здесь
const allowedStatusCodes = ['processed', 'cancelled'];

export class UpdateBookingStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(allowedStatusCodes, {
    message: `Status code must be one of the following: ${allowedStatusCodes.join(', ')}`,
  })
  statusCode: string; // Принимаем код статуса ('processed' или 'cancelled')
}