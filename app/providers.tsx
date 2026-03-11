'use client'   // <-- Required: context uses browser APIs
 
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
 
const AuthContext = createContext<{ user: User | null }>({ user: null })
 
export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    )
    return () => subscription.unsubscribe()
  }, [])
 
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
 
export const useAuth = () => useContext(AuthContext)
