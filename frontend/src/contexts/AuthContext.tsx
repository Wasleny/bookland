"use client";

import { createContext } from "react";
import type { UserProps } from "../types/user";

export interface AuthContextType {
  currentUser: UserProps | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    name: string,
    nickname: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});
