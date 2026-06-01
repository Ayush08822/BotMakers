import { useNavigate } from 'react-router-dom'

const UnauthorizedPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate-fade-up">
        <p className="font-mono text-6xl font-bold text-danger/30 mb-4">403</p>
        <h1 className="font-display font-bold text-2xl text-white mb-2">Access Denied</h1>
        <p className="text-slate-500 text-sm mb-8 font-body">
          You don't have permission to view this page.
        </p>
        <button onClick={() => navigate('/dashboard')} className="btn-ghost max-w-xs mx-auto">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  )
}

export default UnauthorizedPage
