import { useState, useRef } from 'react'
import { useCollection } from '../lib/useCollection'

const empty = {
  title: '', result: '', description: '',
  m1n: '', m1l: '', m2n: '', m2l: '', m3n: '', m3l: '',
}

export default function CampaignsAdmin() {
  const { items, loading, add, update, remove } = useCollection('campaigns')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const formRef = useRef(null)

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function startEdit(c) {
    setEditingId(c.id)
    const m = Array.isArray(c.metrics) ? c.metrics : []
    setForm({
      title: c.title || '',
      result: c.result || '',
      description: c.description || '',
      m1n: m[0]?.num || '', m1l: m[0]?.label || '',
      m2n: m[1]?.num || '', m2l: m[1]?.label || '',
      m3n: m[2]?.num || '', m3l: m[2]?.label || '',
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
    const metrics = [
      { num: form.m1n, label: form.m1l },
      { num: form.m2n, label: form.m2l },
      { num: form.m3n, label: form.m3l },
    ].filter((m) => m.num && m.label)
    const row = {
      title: form.title,
      result: form.result,
      description: form.description,
      metrics,
    }
    try {
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

  return (
    <div>
      <h1 className="text-2xl font-bold">Campaigns</h1>
      <p className="text-ink/60 mt-1">Add campaign success stories with their results.</p>

      <form ref={formRef} onSubmit={handleSubmit}
        className={`rounded-2xl p-6 border mt-6 grid gap-4 ${editingId ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
        <h2 className="font-bold">{editingId ? '✏️ Editing — make your changes and save' : '➕ Add a campaign'}</h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Campaign title *</label>
          <input required value={form.title} onChange={(e) => set('title', e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Taxi App Launch" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Headline result</label>
          <input value={form.result} onChange={(e) => set('result', e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="Reached 2M+ people in 30 days" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea rows={2} value={form.description} onChange={(e) => set('description', e.target.value)}
            className="w-full rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder="What you did and the impact." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Key numbers (up to 3)</label>
          <div className="grid gap-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="grid grid-cols-2 gap-3">
                <input value={form[`m${n}n`]} onChange={(e) => set(`m${n}n`, e.target.value)}
                  className="rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder={`Number (e.g. 2M+)`} />
                <input value={form[`m${n}l`]} onChange={(e) => set(`m${n}l`, e.target.value)}
                  className="rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-gold bg-white" placeholder={`Label (e.g. Reach)`} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={busy}
            className="px-6 py-3 rounded-lg bg-navy text-white font-semibold hover:bg-navy-light disabled:opacity-60">
            {busy ? 'Saving…' : editingId ? '💾 Save Changes' : 'Add Campaign'}
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
        <h2 className="font-bold mb-3">Your campaigns ({items.length})</h2>
        {loading ? (
          <p className="text-ink/60">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-ink/50 bg-white rounded-xl p-6 border border-black/5">No campaigns yet. Add your first one above! 👆</p>
        ) : (
          <div className="grid gap-3">
            {items.map((c) => (
              <div key={c.id}
                className={`rounded-xl p-4 border flex items-center gap-4 ${editingId === c.id ? 'bg-gold/10 border-gold' : 'bg-white border-black/5'}`}>
                <div className="h-12 w-12 rounded-lg bg-emerald-500 text-white grid place-items-center">🚀</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{c.title}</div>
                  <div className="text-sm text-ink/50 truncate">{c.result}</div>
                </div>
                <button onClick={() => startEdit(c)}
                  className="text-navy hover:text-gold text-sm px-3 py-1.5 font-medium">✏️ Edit</button>
                <button onClick={() => { if (confirm('Delete this campaign?')) remove(c.id) }}
                  className="text-red-500 hover:text-red-700 text-sm px-3 py-1.5">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
