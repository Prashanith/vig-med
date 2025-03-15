import { User } from "firebase/auth";
import { ReactNode, useState, useEffect } from "react";
import { auth } from "../../../services/firebase";
import { AuthContext } from "../context/useAuth";

interface IAuthProvider {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProvider): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
