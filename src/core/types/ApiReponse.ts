// Base response type
export interface BaseResponse<T> {
  data: T
  status: string
  code: number
  success: boolean
  message: string
}

// Pagination data structure
export interface PaginationData<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

// Pagination response type
export interface PaginationResponse<T> extends BaseResponse<PaginationData<T>> {
  // Kế thừa tất cả từ BaseResponse nhưng với data là PaginationData<T>
}
