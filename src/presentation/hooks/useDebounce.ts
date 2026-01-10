import { useState, useEffect } from 'react';

/**
 * Custom hook để debounce giá trị, thường dùng cho input tìm kiếm
 * để tránh gọi API quá nhiều lần khi người dùng gõ nhanh
 * 
 * @param value - Giá trị cần debounce
 * @param delay - Thời gian delay (ms), mặc định 500ms
 * @returns Giá trị đã được debounce
 */
export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    // Tạo một timer để set giá trị debounced sau khoảng thời gian delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Cleanup function để clear timer khi value thay đổi hoặc component unmount
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}; 