import { useState, useRef } from 'react'
import { useCollection } from '../lib/useCollection'
import ImageUploader from './ImageUploader'

const empty = { name: '', logo_url: '', description: '', url: '' }

export default function PlatformsAdmin() {
  const { items, loading, add, update, remove } = useCollection('platforms')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const formRef = useRef(null)

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function startEdit(p) {
    setEditingId(p.id)
    setForm({ name: p.name || '', logo_url: p.logo_url || '', description: p.description || '', url: p.url || '' })
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(empty)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      if (editingId) {
        await update(editingId, form)
      } else {
        await add({ ...form, sort_order: items.length })
      }
      cancelEdit()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Platforms We Work On</h1>
      <p className="text-ink/60 mt-1">e.g. Facebook, Instagram, TikTok, YouTube, Google — add a logo and short note.</p>

      <form ref={formRef} onSubmit={handleSubmit}
        className={`rounded-2xl p-6 border mt-6 grid gap-4 ${editingId ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
        <h2 className="font-bold">{editingId ? '✏️ Editing — make your changes and save' : '➕ Add a platform'}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1.5">Platform name *</label>
            <input required value={form.name} onChange={(e) => set('name', e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Instagram" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Link (optional)</label>
            <input value={form.url} onChange={(e) => set('url', e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="https://instagram.com/..." />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Short note (optional)</label>
          <input value={form.description} onChange={(e) => set('description', e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Reels & story ads" />
        </div>
        <ImageUploader value={form.logo_url} folder="platforms" label="Platform logo / icon"
          onUploaded={(url) => set('logo_url', url)} />

        <div className="flex gap-3">
          <button type="submit" disabled={busy}
            className="px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light disabled:opacity-60">
            {busy ? 'Saving…' : editingId ? '💾 Save Changes' : 'Add Platform'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit}
              className="px-6 py-3 rounded-lg border border-black/15 font-semibold hover:bg-black/5 bg-white">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h2 className="font-bold mb-3">Your platforms ({items.length})</h2>
        {loading ? (
          <p className="text-ink/60">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-ink/50 bg-white rounded-xl p-6 border border-black/5">No platforms yet. Add your first one above! 👆</p>
        ) : (
          <div className="grid gap-3">
            {items.map((p) => (
              <div key={p.id}
                className={`rounded-xl p-4 border flex items-center gap-4 ${editingId === p.id ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
                {p.logo_url ? <img src={p.logo_url} alt="" className="h-12 w-12 object-contain" />
                  : <div className="h-12 w-12 rounded bg-black/5 grid place-items-center">★</div>}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{p.name}</div>
                  {p.description && <div className="text-sm text-ink/50 truncate">{p.description}</div>}
                </div>
                <button onClick={() => startEdit(p)}
                  className="text-navy hover:text-gold text-sm px-3 py-1.5 font-medium">✏️ Edit</button>
                <button onClick={() => { if (confirm('Delete this platform?')) remove(p.id) }}
                  className="text-red-500 hover:text-red-700 text-sm px-3 py-1.5">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
