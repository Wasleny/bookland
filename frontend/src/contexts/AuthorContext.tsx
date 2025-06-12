import { createContext } from "react";
import type { AuthorProps } from "../types/author";

export interface AuthorContextType {
  isLoading: boolean;
  authors: AuthorProps[] | undefined;
  getAllAuthors: () => Promise<void>;
  getAuthor: (authorId: string) => AuthorProps | undefined;
  addAuthor: (author: Omit<AuthorProps, "id">) => Promise<void>;
  updateAuthor: (
    authorId: string,
    author: Partial<AuthorProps>
  ) => Promise<void>;
  deleteAuthor: (authorId: string) => Promise<void>;
}

export const AuthorContext = createContext<AuthorContextType>({
  isLoading: true,
  authors: undefined,
  getAllAuthors: async () => undefined,
  getAuthor: () => undefined,
  addAuthor: async () => undefined,
  updateAuthor: async () => undefined,
  deleteAuthor: async () => undefined,
});
