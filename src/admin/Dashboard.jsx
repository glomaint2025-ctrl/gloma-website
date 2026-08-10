import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../lib/api'

const cards = [
  { table: 'works', label: 'Works', icon: '🎬', to: '/admin/works', color: 'bg-blue-500' },
  { table: 'clients', label: 'Clients', icon: '🤝', to: '/admin/clients', color: 'bg-indigo-500' },
  { table: 'platforms', label: 'Platforms', icon: '🌐', to: '/admin/platforms', color: 'bg-cyan-500' },
  { table: 'videos', label: 'Videos', icon: '📹', to: '/admin/videos', color: 'bg-rose-500' },
  { table: 'campaigns', label: 'Campaigns', icon: '🚀', to: '/admin/campaigns', color: 'bg-emerald-500' },
  { table: 'testimonials', label: 'Testimonials', icon: '💬', to: '/admin/testimonials', color: 'bg-amber-500' },
]

export default function Dashboard() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    apiGet('/counts.php').then(setCounts).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>
      <p className="text-ink/60 mt-1">Manage everything on your website from here.</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {cards.map((c) => (
          <Link
            key={c.table}
            to={c.to}
            className="bg-white rounded-2xl p-6 border border-black/5 hover:shadow-lg transition-shadow"
          >
            <div className={`h-11 w-11 rounded-xl ${c.color} text-white grid place-items-center text-xl`}>
              {c.icon}
            </div>
            <div className="text-3xl font-extrabold mt-4">
              {counts[c.table] ?? '–'}
            </div>
            <div className="text-ink/60 text-sm">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 border border-black/5">
        <h2 className="font-bold mb-3">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/settings" className="px-4 py-2 rounded-lg bg-navy text-white text-sm">⚙️ Edit social links & stats</Link>
          <Link to="/admin/works" className="px-4 py-2 rounded-lg bg-cream border border-black/10 text-sm">➕ Add a work</Link>
          <Link to="/admin/videos" className="px-4 py-2 rounded-lg bg-cream border border-black/10 text-sm">➕ Add a video</Link>
        </div>
      </div>
    </div>
  )
}
