import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { error } = await signIn(email, password)
    setBusy(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-navy-deep px-5 relative overflow-hidden">
      <div className="absolute inset-0 aurora opacity-40" />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm glass-dark rounded-2xl p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.jpg" alt="Gloma" className="h-11 w-11 rounded-lg object-cover" />
          <div>
            <div className="font-bold">GLOMA Admin</div>
            <div className="text-xs text-white/50">Dashboard login</div>
          </div>
        </div>

        {error && (
          <div className="mb-4 text-sm bg-red-500/20 border border-red-400/40 text-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <label className="block text-sm mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 rounded-lg bg-white/10 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold"
          placeholder="you@glomaint.com"
        />

        <label className="block text-sm mb-1.5">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 rounded-lg bg-white/10 border border-white/15 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={busy}
          className="w-full py-3 rounded-lg bg-gold text-navy-deep font-semibold hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
