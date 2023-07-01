import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { SidebarDrawerProvider } from "./SidebarDrawerContext";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SidebarDrawerProvider>
        {/**proximo contexto */}
        {children}
      </SidebarDrawerProvider>
    </AuthProvider>
  )
}