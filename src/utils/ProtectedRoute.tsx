import { JSX } from "react";
import { Navigate } from "react-router";
import useAuth from "../features/authentication/context/useAuth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth.currentUser) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
