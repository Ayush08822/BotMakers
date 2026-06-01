import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-white/8 bg-ink-soft/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-accent text-xs font-mono font-bold">J</span>
          </div>
          <span className="font-display font-bold text-white text-sm tracking-wide">
            JWT<span className="text-accent">Auth</span>
          </span>
        </div>

        {/* User info + logout */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white leading-none">{user.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            </div>
            <span className={user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}>
              {user.role === 'ADMIN' ? '⬡' : '◈'} {user.role}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-500 hover:text-danger transition-colors duration-200 font-mono"
            >
              logout →
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
