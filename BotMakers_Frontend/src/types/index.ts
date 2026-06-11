export type Role = 'USER' | 'ADMIN'

export interface User {
  id?: number
  name?: string
  email: string
  role: Role
}

export interface AuthResponse {
  token: string
  name?: string
  email: string
  role: Role
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: Role
}

export interface Task {
  id: number
  title: string
  description: string
  status: string
  userId: number
  createdAt: string
  updatedAt: string
}

export interface TaskRequestDTO {
  title: string
  description: string
  status?: string
}