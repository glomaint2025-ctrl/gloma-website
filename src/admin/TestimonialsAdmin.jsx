import { useState, useRef } from 'react'
import { useCollection } from '../lib/useCollection'
import ImageUploader from './ImageUploader'

const empty = { name: '', role: '', quote: '', avatar_url: '' }

export default function TestimonialsAdmin() {
  const { items, loading, add, update, remove } = useCollection('testimonials')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const formRef = useRef(null)

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function startEdit(t) {
    setEditingId(t.id)
    setForm({ name: t.name || '', role: t.role || '', quote: t.quote || '', avatar_url: t.avatar_url || '' })
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
      <h1 className="text-2xl font-bold">Testimonials</h1>
      <p className="text-ink/60 mt-1">Add reviews from your happy clients.</p>

      <form ref={formRef} onSubmit={handleSubmit}
        className={`rounded-2xl p-6 border mt-6 grid gap-4 ${editingId ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
        <h2 className="font-bold">{editingId ? '✏️ Editing — make your changes and save' : '➕ Add a testimonial'}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1.5">Client name *</label>
            <input required value={form.name} onChange={(e) => set('name', e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Kasun Perera" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Role / Company</label>
            <input value={form.role} onChange={(e) => set('role', e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Owner, Car Plus" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Quote *</label>
          <textarea required rows={3} value={form.quote} onChange={(e) => set('quote', e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Gloma transformed our business..." />
        </div>
        <ImageUploader value={form.avatar_url} folder="avatars" label="Photo (optional)"
          onUploaded={(url) => set('avatar_url', url)} />

        <div className="flex gap-3">
          <button type="submit" disabled={busy}
            className="px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light disabled:opacity-60">
            {busy ? 'Saving…' : editingId ? '💾 Save Changes' : 'Add Testimonial'}
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
        <h2 className="font-bold mb-3">Your testimonials ({items.length})</h2>
        {loading ? (
          <p className="text-ink/60">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-ink/50 bg-white rounded-xl p-6 border border-black/5">No testimonials yet. Add your first one above! 👆</p>
        ) : (
          <div className="grid gap-3">
            {items.map((t) => (
              <div key={t.id}
                className={`rounded-xl p-4 border flex items-center gap-4 ${editingId === t.id ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
                {t.avatar_url
                  ? <img src={t.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
                  : <div className="h-12 w-12 rounded-full bg-navy text-gold grid place-items-center font-bold">{t.name.charAt(0)}</div>}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{t.name}</div>
                  <div className="text-sm text-ink/50 truncate">“{t.quote}”</div>
                </div>
                <button onClick={() => startEdit(t)}
                  className="text-navy hover:text-gold text-sm px-3 py-1.5 font-medium">✏️ Edit</button>
                <button onClick={() => { if (confirm('Delete this testimonial?')) remove(t.id) }}
                  className="text-red-500 hover:text-red-700 text-sm px-3 py-1.5">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
