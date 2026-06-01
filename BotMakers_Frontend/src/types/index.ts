export type Role = 'USER' | 'ADMIN'

export interface AuthResponse {
  token: string
  type: string
  name: string
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

export interface User {
  name: string
  email: string
  role: Role
}
