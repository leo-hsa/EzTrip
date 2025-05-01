// src/types/index.ts

// Экспортируем типы из других файлов
export * from './tour'; // Предполагается, что tour.ts существует
export * from './category';
export * from './dto';

// Можно также определить общие или вспомогательные типы здесь, если нужно
// export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';