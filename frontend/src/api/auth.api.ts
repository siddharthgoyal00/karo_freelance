import api from './axios'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth.types'

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await api.post<{ data: AuthResponse }>('/auth/login', data)
  return res.data.data
}

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  const res = await api.post<{ data: AuthResponse }>('/auth/register', data)
  return res.data.data
}

export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout')
}