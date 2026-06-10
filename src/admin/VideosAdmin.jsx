import { useState, useRef } from 'react'
import { useCollection } from '../lib/useCollection'
import ImageUploader from './ImageUploader'

const empty = { title: '', video_url: '', thumbnail_url: '' }

export default function VideosAdmin() {
  const { items, loading, add, update, remove } = useCollection('videos')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const formRef = useRef(null)

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function startEdit(v) {
    setEditingId(v.id)
    setForm({ title: v.title || '', video_url: v.video_url || '', thumbnail_url: v.thumbnail_url || '' })
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
      <h1 className="text-2xl font-bold">Videos</h1>
      <p className="text-ink/60 mt-1">Add reels, ads and promos. Paste a YouTube/Facebook link, or upload a video file.</p>

      <form ref={formRef} onSubmit={handleSubmit}
        className={`rounded-2xl p-6 border mt-6 grid gap-4 ${editingId ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
        <h2 className="font-bold">{editingId ? '✏️ Editing — make your changes and save' : '➕ Add a video'}</h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Video title *</label>
          <input required value={form.title} onChange={(e) => set('title', e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Brand Reel 2025" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">YouTube / Facebook link</label>
          <input value={form.video_url} onChange={(e) => set('video_url', e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white"
            placeholder="https://youtube.com/watch?v=..." />
          <p className="text-xs text-ink/50 mt-1">Tip: paste a normal YouTube link — we turn it into a player automatically. Or upload a file below.</p>
        </div>
        <ImageUploader value={form.video_url?.match(/\.(mp4|webm|mov)/i) ? form.video_url : ''}
          folder="videos" accept="video/*" label="…or upload a video file"
          onUploaded={(url) => set('video_url', url)} />

        <div className="flex gap-3">
          <button type="submit" disabled={busy}
            className="px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light disabled:opacity-60">
            {busy ? 'Saving…' : editingId ? '💾 Save Changes' : 'Add Video'}
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
        <h2 className="font-bold mb-3">Your videos ({items.length})</h2>
        {loading ? (
          <p className="text-ink/60">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-ink/50 bg-white rounded-xl p-6 border border-black/5">No videos yet. Add your first one above! 👆</p>
        ) : (
          <div className="grid gap-3">
            {items.map((v) => (
              <div key={v.id}
                className={`rounded-xl p-4 border flex items-center gap-4 ${editingId === v.id ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
                <div className="h-14 w-14 rounded-lg bg-navy text-white grid place-items-center">🎬</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{v.title}</div>
                  <div className="text-sm text-ink/50 truncate">{v.video_url}</div>
                </div>
                <button onClick={() => startEdit(v)}
                  className="text-navy hover:text-gold text-sm px-3 py-1.5 font-medium">✏️ Edit</button>
                <button onClick={() => { if (confirm('Delete this video?')) remove(v.id) }}
                  className="text-red-500 hover:text-red-700 text-sm px-3 py-1.5">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
