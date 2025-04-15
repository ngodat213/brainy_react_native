import axios from 'axios'
import { BaseResponse } from '../types/ApiReponse'
import EncryptedStorage from 'react-native-encrypted-storage'
const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptors để xử lý token
api.interceptors.request.use(async (config) => {
  const token = await EncryptedStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Wrapper functions
export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await api.get<BaseResponse<T>>(url)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data
  },

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await api.post<BaseResponse<T>>(url, data)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data
  },

  // Thêm các methods khác khi cần
}