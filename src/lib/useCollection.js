import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'

// A reusable helper to load, add and delete rows from any table.
// Returns the list plus functions to refresh / add / remove.
export function useCollection(table, orderBy = 'sort_order') {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending: true })
      .order('created_at', { ascending: true })
    if (error) setError(error.message)
    setItems(data || [])
    setLoading(false)
  }, [table, orderBy])

  useEffect(() => {
    refresh()
  }, [refresh])

  const add = async (row) => {
    const { error } = await supabase.from(table).insert(row)
    if (error) throw error
    await refresh()
  }

  const update = async (id, row) => {
    const { error } = await supabase.from(table).update(row).eq('id', id)
    if (error) throw error
    await refresh()
  }

  const remove = async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    await refresh()
  }

  return { items, loading, error, refresh, add, update, remove }
}
