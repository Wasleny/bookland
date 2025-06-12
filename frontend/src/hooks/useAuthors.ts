import { useContext } from "react";
import { AuthorContext } from "../contexts/AuthorContext";

export const useAuthors = () => {
  const context = useContext(AuthorContext);

  if (!context)
    throw new Error("useAuthors deve ser usado com o AuthorContext");
  return context;
};
