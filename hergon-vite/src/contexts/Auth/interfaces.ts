import { ToastId } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface UserData {
  id: string; 
  name: string;
  email: string;
  avatarUrl: string;
  area: string;
  password?: string;
  newsletter: boolean;
  openingVideo: boolean;
  myPlan: string;
  refreshToken: string;
  roles: string[];
  token: string;
}

export interface SignInCredentials {
  userEmail: string;
  userPassword: string;
}

export interface AuthContextData {
  user: UserData;
  signIn(credentials: SignInCredentials): Promise<void | ToastId>;
  isAuthenticated: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}