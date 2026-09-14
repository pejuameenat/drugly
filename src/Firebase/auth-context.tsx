import { auth } from './config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  useState,
  useContext,
  useEffect,
  createContext,
  type ReactNode,
  useCallback,
} from 'react'

//create the context (typed here for ts)),
export const AuthContext = createContext<{
  user: any
  loading: boolean
  userId: string | null
  logOut: () => Promise<void>
}>({
  user: null,
  loading: true,
  userId: null,
  logOut: async () => {},
})
// provide the context,

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const logOut = useCallback(async () => {
    await signOut(auth)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
       if (!firebaseUser) {
         logOut()
       }
      setUser(firebaseUser)
      setUserId(firebaseUser?.uid ?? '')
      setLoading(false)
    })


    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, userId, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

//and consume.
export const useAuth = () => useContext(AuthContext)
