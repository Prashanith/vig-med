import { ReactNode } from "react";

interface IAppProvider {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProvider): JSX.Element {
  return <AppProvider>{children}</AppProvider>;
}

export default AppProvider;
