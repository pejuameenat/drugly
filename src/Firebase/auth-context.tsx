import { auth } from "./config";
import { onAuthStateChanged } from "firebase/auth";
import {
  useState,
  useContext,
  useEffect,
  createContext,
  type ReactNode,
} from "react";

//create the context (typed here for ts)),
export const AuthContext = createContext<{
  user: any;
  loading: boolean;
  userId: string | null;
}>({
  user: null,
  loading: true,
  userId: null,
});
// provide the context,

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string |null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setUserId(firebaseUser?.uid ?? "");
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

//and consume.
export const useAuth = () => useContext(AuthContext);
