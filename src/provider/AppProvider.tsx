import { ReactNode } from "react";
import AuthProvider from "../features/authentication/providers/AuthProvider";
import { BrowserRouter } from "react-router";

interface IAppProvider {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}

export default AppProvider;
