import { User } from "firebase/auth";
import { ReactNode, useState, useEffect } from "react";
import { auth } from "../../../services/firebase";
import { AuthContext } from "../context/useAuth";
import { useLocation, useNavigate } from "react-router";

interface IAuthProvider {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setTimeout(() => {
        console.log(location.pathname, user);

        if (user && location.pathname.includes("login")) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      }, 1000);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
