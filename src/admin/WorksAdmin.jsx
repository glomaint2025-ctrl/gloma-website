import { useState, useRef } from 'react'
import { useCollection } from '../lib/useCollection'
import ImageUploader from './ImageUploader'
import MultiImageUploader from './MultiImageUploader'

const empty = { media_type: 'reel', title: '', category: '', description: '', image_url: '', video_url: '', images: [] }

const types = [
  { key: 'reel', label: '🎬 Reel', hint: 'Vertical video' },
  { key: 'ad', label: '📣 Ad', hint: 'Video advert' },
  { key: 'graphic', label: '🖼️ Graphic / Carousel', hint: 'One or more images' },
]

export default function WorksAdmin() {
  const { items, loading, add, update, remove } = useCollection('works')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const formRef = useRef(null)

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  // Load an existing item into the form for editing
  function startEdit(w) {
    setEditingId(w.id)
    setForm({
      media_type: w.media_type || 'graphic',
      title: w.title || '',
      category: w.category || '',
      description: w.description || '',
      image_url: w.image_url || '',
      video_url: w.video_url || '',
      images: Array.isArray(w.images) ? w.images : [],
    })
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
      const row = {
        media_type: form.media_type,
        title: form.title,
        category: form.category,
        description: form.description,
        image_url: form.image_url || (form.images?.[0] ?? ''),
        video_url: form.video_url,
        images: form.media_type === 'graphic' ? form.images : [],
      }
      if (editingId) {
        await update(editingId, row)
      } else {
        await add({ ...row, sort_order: items.length })
      }
      cancelEdit()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setBusy(false)
    }
  }

  const isVideo = form.media_type === 'reel' || form.media_type === 'ad'

  return (
    <div>
      <h1 className="text-2xl font-bold">Our Work</h1>
      <p className="text-ink/60 mt-1">Add reels, ads and graphic posts that show on your site.</p>

      <form ref={formRef} onSubmit={handleSubmit}
        className={`rounded-2xl p-6 border mt-6 grid gap-5 ${editingId ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
        <h2 className="font-bold">{editingId ? '✏️ Editing — make your changes and save' : '➕ Add work'}</h2>

        {/* Type picker */}
        <div>
          <label className="block text-sm font-medium mb-2">What type is it?</label>
          <div className="grid gap-3 sm:grid-cols-3">
            {types.map((t) => (
              <button type="button" key={t.key} onClick={() => set('media_type', t.key)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  form.media_type === t.key ? 'border-gold bg-gold/10 ring-2 ring-gold' : 'border-black/10 bg-white hover:bg-black/5'
                }`}>
                <div className="font-semibold">{t.label}</div>
                <div className="text-xs text-ink/50 mt-0.5">{t.hint}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title *</label>
            <input required value={form.title} onChange={(e) => set('title', e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Summer Campaign Reel" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Client / Category</label>
            <input value={form.category} onChange={(e) => set('category', e.target.value)}
              className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Car Plus" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Short description</label>
          <textarea rows={2} value={form.description} onChange={(e) => set('description', e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="What is this piece about?" />
        </div>

        {/* Video types */}
        {isVideo && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1.5">Video link (YouTube / Facebook) or upload below</label>
              <input value={form.video_url} onChange={(e) => set('video_url', e.target.value)}
                className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="https://youtube.com/watch?v=..." />
            </div>
            <ImageUploader value={form.video_url?.match(/\.(mp4|webm|mov)/i) ? form.video_url : ''}
              folder="works" accept="video/*" label="…or upload a video file"
              onUploaded={(url) => set('video_url', url)} />
            <ImageUploader value={form.image_url} folder="works" label="Cover image (thumbnail)"
              onUploaded={(url) => set('image_url', url)} />
          </>
        )}

        {/* Graphic / carousel */}
        {form.media_type === 'graphic' && (
          <MultiImageUploader value={form.images} folder="works" onChange={(imgs) => set('images', imgs)} />
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={busy}
            className="px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light disabled:opacity-60">
            {busy ? 'Saving…' : editingId ? '💾 Save Changes' : 'Add Work'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit}
              className="px-6 py-3 rounded-lg border border-black/15 font-semibold hover:bg-black/5 bg-white">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="mt-8">
        <h2 className="font-bold mb-3">Your work ({items.length})</h2>
        {loading ? (
          <p className="text-ink/60">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-ink/50 bg-white rounded-xl p-6 border border-black/5">No work yet. Add your first piece above! 👆</p>
        ) : (
          <div className="grid gap-3">
            {items.map((w) => {
              const cover = w.image_url || (Array.isArray(w.images) ? w.images[0] : '')
              return (
                <div key={w.id}
                  className={`rounded-xl p-4 border flex items-center gap-4 ${editingId === w.id ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
                  {cover ? <img src={cover} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    : <div className="h-14 w-14 rounded-lg bg-black/5 grid place-items-center">🎬</div>}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{w.title}</div>
                    <div className="text-sm text-ink/50 truncate capitalize">{w.media_type} · {w.category}</div>
                  </div>
                  <button onClick={() => startEdit(w)}
                    className="text-navy hover:text-gold text-sm px-3 py-1.5 font-medium">✏️ Edit</button>
                  <button onClick={() => { if (confirm('Delete this work?')) remove(w.id) }}
                    className="text-red-500 hover:text-red-700 text-sm px-3 py-1.5">Delete</button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
