import { useAuth } from "@/contexts/Auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  // user is not authenticated
  if(user.token === "") {
    // send user to /login
    return <Navigate to="/" />;
  } else {
    // return the component inside route
    return children;
  }
}
