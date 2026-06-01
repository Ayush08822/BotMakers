import api from './axios'
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types'

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload)
  return data
}

export const registerApi = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', payload)
  return data
}

export const fetchPublicData  = async () => (await api.get('/public')).data
export const fetchUserData    = async () => (await api.get('/user')).data
export const fetchAdminData   = async () => (await api.get('/admin')).data
