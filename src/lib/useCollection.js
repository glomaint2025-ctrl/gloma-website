import { useCallback, useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, apiDelete } from './api'

// A reusable helper to load, add and delete rows from any table.
// Returns the list plus functions to refresh / add / remove.
export function useCollection(table) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiGet(`/${table}.php`)
      setItems(data || [])
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [table])

  useEffect(() => {
    refresh()
  }, [refresh])

  const add = async (row) => {
    await apiPost(`/${table}.php`, row)
    await refresh()
  }

  const update = async (id, row) => {
    await apiPut(`/${table}.php?id=${id}`, row)
    await refresh()
  }

  const remove = async (id) => {
    await apiDelete(`/${table}.php?id=${id}`)
    await refresh()
  }

  return { items, loading, error, refresh, add, update, remove }
}
