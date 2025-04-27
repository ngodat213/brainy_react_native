export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  content: string;
  cloudinaryFileId: string;
  status: string;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
}

/**
 * Create a Lesson object with default values for missing fields
 */
export const createLesson = (data: Partial<Lesson>): Lesson => ({
  id: data.id || '',
  categoryId: data.categoryId || '',
  title: data.title || '',
  description: data.description || '',
  content: data.content || '',
  cloudinaryFileId: data.cloudinaryFileId || '',
  status: data.status || 'inactive',
  orderIndex: data.orderIndex || 0,
  createdAt: data.createdAt || new Date(),
  updatedAt: data.updatedAt || new Date(),
  imageUrl: data.imageUrl || '',
});

/**
 * Convert JSON from API to Lesson entity
 */
export const lessonFromJson = (json: any): Lesson => {
  return createLesson({
    id: json.id,
    categoryId: json.category_id,
    title: json.title,
    description: json.description,
    content: json.content,
    cloudinaryFileId: json.cloudinary_file_id,
    status: json.status,
    orderIndex: json.order_index,
    createdAt: parseDateTime(json.created_at),
    updatedAt: parseDateTime(json.updated_at),
    imageUrl: json.image_url,
  });
};

/**
 * Convert Lesson entity to JSON for API
 */
export const lessonToJson = (lesson: Lesson): any => {
  return {
    id: lesson.id,
    category_id: lesson.categoryId,
    title: lesson.title,
    description: lesson.description,
    content: lesson.content,
    cloudinary_file_id: lesson.cloudinaryFileId,
    status: lesson.status,
    order_index: lesson.orderIndex,
    created_at: formatDateTime(lesson.createdAt),
    updated_at: formatDateTime(lesson.updatedAt),
    image_url: lesson.imageUrl,
  };
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
