import { useEffect, useState, type ReactNode } from "react";
import type { UserProps } from "../types/user";
import users from "../mocks/mockUsers";
import { AuthContext } from "../contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPassword } = user;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(userWithoutPassword)
          );
          
          resolve();
        } else {
          reject(new Error("Email ou senha incorretos"));
        }
      }, 500);
    });
  };

  const register = async (
    email: string,
    name: string,
    nickname: string,
    password: string,
  ) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
          reject(new Error("Esse email já existe no sistema"));
        } else {
          const newUser: UserProps = {
            id: `user-${Date.now()}`,
            email,
            password,
            name,
            nickname,
            avatarUrl: '/images/avatars/generic.svg',
            role: "user",
          };

          users.push(newUser);

          //eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...userWithoutPassword } = newUser;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(userWithoutPassword)
          );

          resolve();
        }
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
