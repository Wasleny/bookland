import { useEffect, useState, type ReactNode } from "react";
import type { UserProps } from "../types/user";
import { AuthContext } from "../contexts/AuthContext";
import { mockUsers } from "../mocks/mockUsers";
import { UserService } from "../services/user.service";
import { mapUserFromApi } from "../utils/mappers/user.mapper";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.birthdate = user.birthdate
        ? new Date(user.birthdate.replace(/Z$/, ""))
        : undefined;

      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await UserService.login({ email, password });

    const user = mapUserFromApi(response.data.user);

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", response.data.token);
  };

  const register = async (
    email: string,
    name: string,
    nickname: string,
    password: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((u) => u.email === email);

        if (existingUser) {
          reject(new Error("Esse email já existe no sistema"));
        } else {
          const newUser: UserProps = {
            id: `user-${Date.now()}`,
            email,
            password,
            name,
            nickname,
            avatarUrl: "/images/avatars/generic.svg",
            role: "user",
          };

          mockUsers.push(newUser);

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
