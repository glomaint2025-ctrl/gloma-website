import { useState } from 'react'
import { uploadFile } from '../lib/storage'

// Shows a file picker; uploads to storage; calls onUploaded(publicUrl).
// `value` is the current image URL (shows a preview).
export default function ImageUploader({ value, onUploaded, folder = 'misc', accept = 'image/*', label = 'Image' }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const url = await uploadFile(file, folder)
      onUploaded(url)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <div className="flex items-center gap-4">
        {value ? (
          <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover border border-black/10" />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-black/5 grid place-items-center text-2xl text-ink/30">🖼️</div>
        )}
        <label className="cursor-pointer px-4 py-2 rounded-lg border border-black/15 text-sm hover:bg-black/5">
          {busy ? 'Uploading…' : value ? 'Change' : 'Choose file'}
          <input type="file" accept={accept} className="hidden" onChange={handleChange} disabled={busy} />
        </label>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
