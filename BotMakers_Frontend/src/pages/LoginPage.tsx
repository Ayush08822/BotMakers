import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useAuth'
import type { LoginPayload } from '../types'

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>()
  const { mutate: login, isLoading, error } = useLogin()

  const onSubmit = (data: LoginPayload) => login(data)

  const apiError = (error as any)?.response?.data?.error

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-white">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-2 font-body">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="card animate-fade-up-delay">
          {/* API Error */}
          {apiError && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm font-body animate-fade-in">
              ⚠ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-danger text-xs mt-1.5 font-body">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="••••••••"
                className="input-field"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-danger text-xs mt-1.5 font-body">{errors.password.message}</p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary mt-2">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign in →'
              )}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-slate-500 text-sm mt-6 animate-fade-up-delay2">
          No account?{' '}
          <Link to="/register" className="text-accent hover:text-accent-glow transition-colors">
            Create one →
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
