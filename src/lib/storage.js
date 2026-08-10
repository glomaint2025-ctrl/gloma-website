import { apiUpload } from './api'

// Uploads a file to the server and returns its public URL.
// `folder` keeps things tidy (e.g. 'works', 'videos', 'avatars').
export async function uploadFile(file, folder = 'misc') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const data = await apiUpload('/upload.php', formData)
  return data.url
}
