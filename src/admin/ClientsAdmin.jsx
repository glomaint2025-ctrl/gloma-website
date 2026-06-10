import { useState, useRef } from 'react'
import { useCollection } from '../lib/useCollection'
import ImageUploader from './ImageUploader'

const empty = { name: '', logo_url: '', website: '' }

export default function ClientsAdmin() {
  const { items, loading, add, update, remove } = useCollection('clients')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const formRef = useRef(null)

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function startEdit(c) {
    setEditingId(c.id)
    setForm({ name: c.name || '', logo_url: c.logo_url || '', website: c.website || '' })
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
      <h1 className="text-2xl font-bold">Trusted Clients</h1>
      <p className="text-ink/60 mt-1">Upload client logos for the scrolling logo bar on your homepage.</p>

      <form ref={formRef} onSubmit={handleSubmit}
        className={`rounded-2xl p-6 border mt-6 grid gap-4 ${editingId ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
        <h2 className="font-bold">{editingId ? '✏️ Editing — make your changes and save' : '➕ Add a client'}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1.5">Client name *</label>
            <input required value={form.name} onChange={(e) => set('name', e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Car Plus Total Care" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Website (optional)</label>
            <input value={form.website} onChange={(e) => set('website', e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="https://..." />
          </div>
        </div>
        <ImageUploader value={form.logo_url} folder="clients" label="Client logo (PNG with transparent background works best)"
          onUploaded={(url) => set('logo_url', url)} />

        <div className="flex gap-3">
          <button type="submit" disabled={busy}
            className="px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light disabled:opacity-60">
            {busy ? 'Saving…' : editingId ? '💾 Save Changes' : 'Add Client'}
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
        <h2 className="font-bold mb-3">Your clients ({items.length})</h2>
        {loading ? (
          <p className="text-ink/60">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-ink/50 bg-white rounded-xl p-6 border border-black/5">No clients yet. Add your first one above! 👆</p>
        ) : (
          <div className="grid gap-3">
            {items.map((c) => (
              <div key={c.id}
                className={`rounded-xl p-4 border flex items-center gap-4 ${editingId === c.id ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
                {c.logo_url ? <img src={c.logo_url} alt="" className="h-12 w-20 object-contain" />
                  : <div className="h-12 w-20 rounded bg-black/5 grid place-items-center text-xs text-ink/40">No logo</div>}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{c.name}</div>
                  {c.website && <div className="text-sm text-ink/50 truncate">{c.website}</div>}
                </div>
                <button onClick={() => startEdit(c)}
                  className="text-navy hover:text-gold text-sm px-3 py-1.5 font-medium">✏️ Edit</button>
                <button onClick={() => { if (confirm('Delete this client?')) remove(c.id) }}
                  className="text-red-500 hover:text-red-700 text-sm px-3 py-1.5">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
