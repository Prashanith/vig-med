import { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../features/authentication/context/useAuth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation;
  const auth = useAuth();

  if (!auth.currentUser) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
