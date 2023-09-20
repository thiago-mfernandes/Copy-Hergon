import { ToastId } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface UserData {
  id: string; 
  name: string;
  email: string;
  avatarUrl: string | null;
  area: string;
  company?: string;  
  password?: string | null;
  newsletter: boolean | null;
  openingVideo: boolean;
  myPlan: string | null;
  refreshToken: string | null;
  role?: string;
  token: string | null;
  isDeleted: boolean;
}

export interface SignInCredentials {
  userEmail: string;
  userPassword: string;
}

export interface AuthContextData {
  user: UserData;
  signIn(credentials: SignInCredentials): Promise<void | ToastId>;
  signOut: () => void;
  isAuthenticated: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}