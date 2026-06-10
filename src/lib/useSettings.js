import { useEffect, useState } from 'react'
import { supabase } from './supabase'

// Loads the single site_settings row (social links + stats) for public pages.
export function useSettings() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data }) => setSettings(data))
  }, [])

  return settings
}
