import { useQuery } from 'react-query'
import Navbar from '../components/layout/Navbar'
import { fetchPublicData, fetchUserData, fetchAdminData } from '../api/auth'
import { useAuthStore } from '../store/authStore'

interface ApiSection {
  title: string
  endpoint: string
  badge: string
  badgeClass: string
  queryKey: string
  fetchFn: () => Promise<any>
  allowed: boolean
  description: string
}

const DataCard = ({ section }: { section: ApiSection }) => {
  const { data, isLoading, error, refetch } = useQuery(
    section.queryKey,
    section.fetchFn,
    { enabled: section.allowed, retry: false }
  )

  return (
    <div className="section-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-white text-base">{section.title}</h3>
          <code className="text-xs font-mono text-slate-500 mt-0.5 block">{section.endpoint}</code>
        </div>
        <span className={section.badgeClass}>{section.badge}</span>
      </div>

      <p className="text-xs text-slate-500 mb-4 font-body">{section.description}</p>

      {/* Response area */}
      <div className="bg-ink rounded-lg p-4 min-h-[80px] border border-white/5">
        {!section.allowed ? (
          <div className="flex items-center gap-2 text-slate-600 text-xs font-mono">
            <span className="text-danger">✕</span>
            Access denied — insufficient role
          </div>
        ) : isLoading ? (
          <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
            <span className="w-3 h-3 border border-accent/40 border-t-accent rounded-full animate-spin" />
            Fetching...
          </div>
        ) : error ? (
          <div className="text-danger text-xs font-mono">
            ⚠ {(error as any)?.response?.data?.error ?? 'Request failed'}
          </div>
        ) : (
          <pre className="text-accent text-xs font-mono whitespace-pre-wrap leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>

      {section.allowed && (
        <button
          onClick={() => refetch()}
          className="mt-3 text-xs font-mono text-slate-500 hover:text-accent transition-colors"
        >
          ↺ refetch
        </button>
      )}
    </div>
  )
}

const DashboardPage = () => {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'ADMIN'

  const sections: ApiSection[] = [
    {
      title: 'Public Endpoint',
      endpoint: 'GET /api/public',
      badge: '● ALL',
      badgeClass: 'badge bg-slate-700/50 text-slate-300 border border-white/10',
      queryKey: 'public',
      fetchFn: fetchPublicData,
      allowed: true,
      description: 'No authentication required. Anyone can access this endpoint.',
    },
    {
      title: 'User Endpoint',
      endpoint: 'GET /api/user',
      badge: '◈ USER',
      badgeClass: 'badge-user',
      queryKey: 'user',
      fetchFn: fetchUserData,
      allowed: true,
      description: 'Requires a valid JWT token. Accessible by USER and ADMIN roles.',
    },
    {
      title: 'Admin Endpoint',
      endpoint: 'GET /api/admin',
      badge: '⬡ ADMIN',
      badgeClass: 'badge-admin',
      queryKey: 'admin',
      fetchFn: fetchAdminData,
      allowed: isAdmin,
      description: 'Restricted to ADMIN role only. Returns 403 for USER role.',
    },
  ]

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome header */}
        <div className="mb-10 animate-fade-up">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display font-bold text-3xl text-white">
              Dashboard
            </h1>
            <span className={isAdmin ? 'badge-admin' : 'badge-user'}>
              {isAdmin ? '⬡ ADMIN' : '◈ USER'}
            </span>
          </div>
          <p className="text-slate-500 font-body text-sm">
            Logged in as <span className="text-slate-300">{user?.email}</span> · Testing RBAC endpoints below
          </p>
        </div>

        {/* Token display */}
        <div className="mb-8 p-4 bg-ink-soft border border-white/8 rounded-xl animate-fade-up-delay">
          <p className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">JWT Token (stored in localStorage)</p>
          <code className="text-xs font-mono text-accent/70 break-all leading-relaxed">
            {localStorage.getItem('jwt_token')}
          </code>
        </div>

        {/* API Sections */}
        <div className="grid gap-5 md:grid-cols-1">
          {sections.map((s) => (
            <DataCard key={s.queryKey} section={s} />
          ))}
        </div>

        {/* Role note */}
        {!isAdmin && (
          <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl animate-fade-up-delay2">
            <p className="text-xs font-mono text-amber-400/70">
              ℹ You are logged in as <strong>USER</strong>. Register with ADMIN role to unlock the admin endpoint.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default DashboardPage
