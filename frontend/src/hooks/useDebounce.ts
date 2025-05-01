// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * Хук для получения значения с задержкой (debounce).
 * Полезно для инпутов поиска, чтобы не отправлять запрос на каждый символ.
 * @param value Значение, которое нужно дебаунсить
 * @param delay Задержка в миллисекундах
 * @returns Дебаунсированное значение
 */
function useDebounce<T>(value: T, delay: number): T {
  // Состояние для хранения дебаунсированного значения
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Устанавливаем таймер, который обновит значение после задержки
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем таймер при изменении значения или задержки, или при размонтировании
    // Это предотвращает обновление значения, если value изменился в течение delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Перезапускаем эффект только если value или delay изменились

  return debouncedValue;
}

export default useDebounce;