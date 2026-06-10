import { useState } from 'react'
import { uploadFile } from '../lib/storage'

// Upload several images (for carousel posts). Shows thumbnails; lets you remove.
export default function MultiImageUploader({ value = [], onChange, folder = 'works' }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleChange(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setBusy(true)
    setError('')
    try {
      const urls = []
      for (const file of files) {
        urls.push(await uploadFile(file, folder))
      }
      onChange([...value, ...urls])
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  function remove(idx) {
    onChange(value.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">Carousel images (add several)</label>
      <div className="flex flex-wrap gap-3">
        {value.map((url, idx) => (
          <div key={idx} className="relative">
            <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover border border-black/10" />
            <button type="button" onClick={() => remove(idx)}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs grid place-items-center">✕</button>
          </div>
        ))}
        <label className="h-20 w-20 rounded-lg border-2 border-dashed border-black/15 grid place-items-center cursor-pointer hover:bg-black/5 text-2xl text-ink/40">
          {busy ? '…' : '+'}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleChange} disabled={busy} />
        </label>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
