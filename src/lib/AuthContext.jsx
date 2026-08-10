import { createContext, useContext, useEffect, useState } from 'react'
import { apiGet, apiPost, getToken, setToken } from './api'

const AuthContext = createContext(null)

// Wraps the app and keeps track of whether an admin is logged in.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(!!getToken())

  useEffect(() => {
    const token = getToken()
    if (!token) return
    apiGet('/auth/me.php')
      .then((data) => {
        setSession(token)
        setUser(data.user)
      })
      .catch(() => {
        setToken(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function signIn(email, password) {
    try {
      const data = await apiPost('/auth/login.php', { email, password })
      setToken(data.token)
      setSession(data.token)
      setUser(data.user)
      return { error: null }
    } catch (err) {
      return { error: { message: err.message } }
    }
  }

  async function signOut() {
    setToken(null)
    setSession(null)
    setUser(null)
  }

  const value = { session, user, loading, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Easy way for any component to read the login state
export function useAuth() {
  return useContext(AuthContext)
}
