import { useEffect, useState } from 'react'
import { apiGet } from './api'

// Loads the single site_settings row (social links + stats) for public pages.
export function useSettings() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    apiGet('/settings.php')
      .then(setSettings)
      .catch(() => setSettings(null))
  }, [])

  return settings
}
