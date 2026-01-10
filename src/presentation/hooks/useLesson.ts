import { useState, useEffect, useCallback } from 'react';
import { Lesson } from '../../domain/entities/lesson';
import { Category } from '../../domain/entities/category';

/**
 * Custom hook để quản lý bài học
 * 
 * @param initialLessons - Danh sách bài học ban đầu (nếu có)
 * @returns Các giá trị và hàm để xử lý bài học
 */
export const useLesson = (initialLessons: Lesson[] = []) => {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // Chọn bài học hiện tại
  const selectLesson = useCallback((lesson: Lesson) => {
    setCurrentLesson(lesson);
  }, []);

  // Chọn danh mục
  const selectCategory = useCallback((category: Category) => {
    setCurrentCategory(category);
    
    // Nếu danh mục có bài học, cập nhật danh sách bài học
    if (category.lessons && category.lessons.length > 0) {
      setLessons(category.lessons);
    }
  }, []);

  // Tải bài học từ danh mục
  const loadLessonsFromCategory = useCallback(async (categoryId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Giả định: Tải bài học từ API dựa vào categoryId
      // Dưới đây là phần mô phỏng - bạn cần thay thế bằng logic thực tế
      // const response = await fetchLessonsFromCategory(categoryId);
      // setLessons(response.data);
      
      // Tìm danh mục từ danh sách hiện có và cập nhật danh sách bài học
      const foundCategory = categories.find(cat => cat.id === categoryId);
      if (foundCategory && foundCategory.lessons) {
        setLessons(foundCategory.lessons);
      }
      
    } catch (err) {
      setError('Không thể tải bài học. Vui lòng thử lại!');
      console.error('Error loading lessons:', err);
    } finally {
      setLoading(false);
    }
  }, [categories]);

  // Sắp xếp bài học theo thứ tự
  const sortLessonsByOrder = useCallback(() => {
    setLessons(prev => [...prev].sort((a, b) => a.orderIndex - b.orderIndex));
  }, []);

  // Tìm kiếm bài học theo từ khóa
  const searchLessons = useCallback((keyword: string) => {
    if (!keyword.trim()) {
      // Nếu từ khóa rỗng, hiển thị tất cả bài học từ danh mục hiện tại
      if (currentCategory && currentCategory.lessons) {
        setLessons(currentCategory.lessons);
      }
      return;
    }

    const lowercaseKeyword = keyword.toLowerCase();
    
    // Tìm trong danh sách bài học của danh mục hiện tại
    if (currentCategory && currentCategory.lessons) {
      const filtered = currentCategory.lessons.filter(lesson => 
        lesson.title.toLowerCase().includes(lowercaseKeyword) || 
        lesson.description.toLowerCase().includes(lowercaseKeyword)
      );
      setLessons(filtered);
    }
  }, [currentCategory]);

  // Tải danh sách danh mục
  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Giả định: Tải danh mục từ API
      // Dưới đây là phần mô phỏng - bạn cần thay thế bằng logic thực tế
      // const response = await fetchCategories();
      // setCategories(response.data);
      
    } catch (err) {
      setError('Không thể tải danh mục. Vui lòng thử lại!');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Tải danh mục khi component mount
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    lessons,
    currentLesson,
    loading,
    error,
    categories,
    currentCategory,
    selectLesson,
    selectCategory,
    loadLessonsFromCategory,
    sortLessonsByOrder,
    searchLessons
  };
}; 