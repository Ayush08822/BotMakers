import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useAuth'
import type { RegisterPayload, Role } from '../types'

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>({
    defaultValues: { role: 'USER' },
  })
  const { mutate: registerUser, isLoading, error } = useRegister()

  const onSubmit = (data: RegisterPayload) => registerUser(data)

  const apiError = (error as any)?.response?.data?.error

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-50">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <span className="text-2xl">✦</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-slate-900">Create account</h1>
          <p className="text-slate-500 text-sm mt-2 font-body">Get started in seconds</p>
        </div>

        {/* Card */}
        <div className="card animate-fade-up-delay">
          {apiError && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-body animate-fade-in">
              ⚠ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="Alice Smith"
                className="input-field"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                })}
                type="email"
                placeholder="alice@example.com"
                className="input-field"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                })}
                type="password"
                placeholder="••••••••"
                className="input-field"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['USER', 'ADMIN'] as Role[]).map((r) => (
                  <label key={r} className="cursor-pointer">
                    <input
                      {...register('role')}
                      type="radio"
                      value={r}
                      className="sr-only peer"
                    />
                    <div className="peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700
                                    border border-slate-200 rounded-lg px-4 py-3 text-center text-sm font-bold
                                    text-slate-500 hover:border-slate-300 transition-all duration-200 bg-white">
                      {r === 'USER' ? '◈ USER' : '⬡ ADMIN'}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary mt-4">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create account →'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6 animate-fade-up-delay2">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage