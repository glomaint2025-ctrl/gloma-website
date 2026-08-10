import { useEffect, useState } from 'react'
import { apiGet, apiPut } from '../lib/api'

const socialFields = [
  { key: 'facebook_url', label: 'Facebook URL', placeholder: 'https://facebook.com/yourpage' },
  { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/yourpage' },
  { key: 'youtube_url', label: 'YouTube URL', placeholder: 'https://youtube.com/@yourchannel' },
  { key: 'tiktok_url', label: 'TikTok URL', placeholder: 'https://tiktok.com/@yourpage' },
  { key: 'whatsapp_url', label: 'WhatsApp link', placeholder: 'https://wa.me/94XXXXXXXXX' },
]

const statFields = [
  { key: 'stat_years', label: 'Years of Innovation' },
  { key: 'stat_projects', label: 'Projects Delivered' },
  { key: 'stat_team', label: 'Expert Team Members' },
  { key: 'stat_satisfaction', label: 'Client Satisfaction (%)' },
]

export default function SettingsAdmin() {
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    apiGet('/settings.php').then(setForm)
  }, [])

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await apiPut('/settings.php', {
        facebook_url: form.facebook_url,
        instagram_url: form.instagram_url,
        youtube_url: form.youtube_url,
        tiktok_url: form.tiktok_url,
        whatsapp_url: form.whatsapp_url,
        stat_years: Number(form.stat_years) || 0,
        stat_projects: Number(form.stat_projects) || 0,
        stat_team: Number(form.stat_team) || 0,
        stat_satisfaction: Number(form.stat_satisfaction) || 0,
      })
      setSaved(true)
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <p className="text-ink/60">Loading…</p>

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-ink/60 mt-1">Your social links and the numbers shown on the homepage.</p>

      {/* Social links */}
      <section className="bg-white rounded-2xl p-6 border border-black/5 mt-6">
        <h2 className="font-bold mb-4">🔗 Social Media Links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {socialFields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1.5">{f.label}</label>
              <input
                type="url"
                value={form[f.key] || ''}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white rounded-2xl p-6 border border-black/5 mt-6">
        <h2 className="font-bold mb-4">📊 Homepage Stats</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statFields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1.5">{f.label}</label>
              <input
                type="number"
                value={form[f.key] ?? 0}
                onChange={(e) => set(f.key, e.target.value)}
                className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {saved && <span className="text-emerald-600 font-medium">✓ Saved!</span>}
      </div>
    </div>
  )
}
