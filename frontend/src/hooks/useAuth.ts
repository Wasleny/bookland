import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth deve ser usado com o AuthProvider");
  return context;
};
