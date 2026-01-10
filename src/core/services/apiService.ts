import axios from 'axios'
import { BaseResponse } from '../types/ApiReponse'
import EncryptedStorage from 'react-native-encrypted-storage'
import { BEARER_TOKEN, TIMEOUT_REQUEST, TOKEN_KEY } from '../constants/constants'

const BASE_URL = process.env.API_URL || 'http://192.168.0.105:8888/brainy_php/index.php/api' 

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_REQUEST,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptors để xử lý token
api.interceptors.request.use(async (config) => {
  const token = await EncryptedStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `${BEARER_TOKEN} ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Server trả về response với status code nằm ngoài range 2xx
      console.log('Error response:', error.response.data)
      throw new Error(error.response.data.message || 'Server error')
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.log('Error request:', error.request)
      throw new Error('Network error - No response from server')
    } else {
      // Có lỗi khi setup request
      console.log('Error:', error.message)
      throw new Error('Request setup error')
    }
  }
)

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