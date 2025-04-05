import { ReactNode } from "react";

interface IAppProvider {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProvider) {
  return <AppProvider>{children}</AppProvider>;
}

export default AppProvider;
