import { Lesson, lessonFromJson, lessonToJson } from './lesson';

export interface Category {
  id: string;
  title: string;
  description: string;
  status: string;
  orderIndex: number;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  lessons?: Lesson[];
}

/**
 * Create a Category object with default values for missing fields
 */
export const createCategory = (data: Partial<Category>): Category => ({
  id: data.id || '',
  title: data.title || '',
  description: data.description || '',
  status: data.status || 'inactive',
  orderIndex: data.orderIndex || 0,
  progress: data.progress || 0,
  createdAt: data.createdAt || new Date(),
  updatedAt: data.updatedAt || new Date(),
  lessons: data.lessons,
});

/**
 * Convert JSON from API to Category entity
 */
export const categoryFromJson = (json: any): Category => {
  // Parse lessons if they exist in the JSON
  let parsedLessons: Lesson[] | undefined;
  if (json.lessons && Array.isArray(json.lessons)) {
    parsedLessons = json.lessons.map((lessonJson: any) => lessonFromJson(lessonJson));
  }

  return createCategory({
    id: json.id,
    title: json.title,
    description: json.description,
    status: json.status,
    orderIndex: json.order_index,
    progress: json.progress,
    createdAt: parseDateTime(json.created_at),
    updatedAt: parseDateTime(json.updated_at),
    lessons: parsedLessons,
  });
};

/**
 * Convert Category entity to JSON for API
 */
export const categoryToJson = (category: Category): any => {
  const json: any = {
    id: category.id,
    title: category.title,
    description: category.description,
    status: category.status,
    order_index: category.orderIndex,
    progress: category.progress,
    created_at: formatDateTime(category.createdAt),
    updated_at: formatDateTime(category.updatedAt),
  };

  // Include lessons if they exist
  if (category.lessons && category.lessons.length > 0) {
    json.lessons = category.lessons.map(lesson => lessonToJson(lesson));
  }

  return json;
};

/**
 * Helper function to parse date string to Date object
 */
function parseDateTime(dateStr?: string): Date {
  if (!dateStr) {
    return new Date();
  }

  try {
    return new Date(dateStr.replace(' ', 'T'));
  } catch (e) {
    console.error('Error parsing date:', e);
    return new Date();
  }
}

/**
 * Helper function to format Date object to string
 */
function formatDateTime(date: Date): string {
  return date.toISOString().replace('T', ' ').substring(0, 19);
} 