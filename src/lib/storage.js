import { supabase } from './supabase'

// Uploads a file to the "media" bucket and returns its public URL.
// `folder` keeps things tidy (e.g. 'works', 'videos', 'avatars').
export async function uploadFile(file, folder = 'misc') {
  // Build a safe, unique filename (timestamp + cleaned original name)
  const clean = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const path = `${folder}/${Date.now()}_${clean}`

  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error

  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}
