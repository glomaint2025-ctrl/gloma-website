import { useState } from 'react'
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/admin/works', label: 'Our Work', icon: '🎬' },
  { to: '/admin/clients', label: 'Trusted Clients', icon: '🤝' },
  { to: '/admin/platforms', label: 'Platforms', icon: '🌐' },
  { to: '/admin/videos', label: 'Videos', icon: '📹' },
  { to: '/admin/campaigns', label: 'Campaigns', icon: '🚀' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: '💬' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cream text-ink flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 inset-y-0 left-0 w-64 bg-navy-deep text-white flex flex-col transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-5 h-16 flex items-center gap-3 border-b border-white/10">
          <img src="/logo.jpg" alt="Gloma" className="h-9 w-9 rounded-lg object-cover" />
          <span className="font-bold">GLOMA Admin</span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-gold text-navy-deep font-semibold' : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Link to="/" target="_blank" className="block px-4 py-2 text-sm text-white/70 hover:text-gold">
            🌐 View website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-white/70 hover:text-red-300"
          >
            🚪 Log out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main area */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-5 sticky top-0 z-20">
          <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>☰</button>
          <div className="ml-auto text-sm text-ink/60">
            👤 {user?.email}
          </div>
        </header>

        <main className="flex-1 p-5 md:p-8 max-w-5xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
