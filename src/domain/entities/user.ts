export interface User {
  id: string
  username: string
  email: string
  full_name: string
  avatar_url?: string
  status: UserStatus
  created_at: string
  updated_at: string
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}