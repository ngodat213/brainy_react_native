import { UserStatus } from "../../domain/entities/user"

export interface UserDTO {
  id: string
  username: string
  email: string
  full_name: string
  avatar_url?: string
  status: UserStatus
  created_at: string
  updated_at: string
}


// Response từ API login
export interface LoginResponseDTO {
  data: {
    user: UserDTO
    access_token: string
    refresh_token: string
    expires_in: number
    total?: number
  }
  status: string
  code: number
  success: boolean
  message: string
}

export interface RegisterResponseDTO {
  data: {
    user: UserDTO
  }
}
