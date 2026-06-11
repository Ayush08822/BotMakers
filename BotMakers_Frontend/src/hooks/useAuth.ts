import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import type { LoginPayload, RegisterPayload, User } from '../types'

export const useLogin = () => {
  const { setAuth } = useAuthStore()
  const navigate    = useNavigate()

  return useMutation(
    (payload: LoginPayload) => loginApi(payload),
    {
      onSuccess: (data) => {
        const user: User = { name: data.name, email: data.email, role: data.role }
        setAuth(data.token, user)
        navigate('/dashboard')
      },
    }
  )
}

export const useRegister = () => {
  const { setAuth } = useAuthStore()
  const navigate    = useNavigate()

  return useMutation(
    (payload: RegisterPayload) => registerApi(payload),
    {
      onSuccess: (data) => {
        const user: User = { name: data.name, email: data.email, role: data.role }
        setAuth(data.token, user)
        navigate('/dashboard')
      },
    }
  )
}