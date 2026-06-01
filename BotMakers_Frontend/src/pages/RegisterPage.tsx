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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">✦</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-white">Create account</h1>
          <p className="text-slate-500 text-sm mt-2 font-body">Get started in seconds</p>
        </div>

        {/* Card */}
        <div className="card animate-fade-up-delay">
          {apiError && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm font-body animate-fade-in">
              ⚠ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="Alice Smith"
                className="input-field"
              />
              {errors.name && (
                <p className="text-danger text-xs mt-1.5">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
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
                <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
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
                <p className="text-danger text-xs mt-1.5">{errors.password.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
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
                    <div className="peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent
                                    border border-white/10 rounded-lg px-4 py-3 text-center text-sm font-mono
                                    text-slate-400 hover:border-white/20 transition-all duration-200">
                      {r === 'USER' ? '◈ USER' : '⬡ ADMIN'}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary mt-2">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
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
          <Link to="/login" className="text-accent hover:text-accent-glow transition-colors">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
