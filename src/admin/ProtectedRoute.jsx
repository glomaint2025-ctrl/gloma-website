import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

// Lets the page through only if logged in; otherwise sends to /admin/login.
export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-navy-deep text-white/60">
        Loading…
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />

  return children
}
