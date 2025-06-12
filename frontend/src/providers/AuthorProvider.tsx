import { useEffect, useState, type ReactNode } from "react";
import type { AuthorProps } from "../types/author";
import { AuthorContext } from "../contexts/AuthorContext";
import { mockAuthors } from "../mocks/mockAuthors";

interface AuthorProviderProps {
  children: ReactNode;
}

export const AuthorProvider = ({ children }: AuthorProviderProps) => {
  const [authors, setAuthors] = useState<AuthorProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([getAllAuthors()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const getAllAuthors = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAuthors(mockAuthors);
        resolve();
      }, 500);
    });
  };

  const getAuthor = (authorId: string) => {
    return authors.find((author) => author.id === authorId);
  };

  const addAuthor = async (authorData: Omit<AuthorProps, "id">) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newAuthor: AuthorProps = {
          id: `author-${Date.now()}`,
          ...authorData,
        };
        setAuthors((prev) => [...prev, newAuthor]);
        resolve();
      }, 500);
    });
  };

  const updateAuthor = async (
    authorId: string,
    authorData: Partial<AuthorProps>
  ) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const authorIndex = authors.findIndex(
          (author) => author.id === authorId
        );

        if (authorIndex === -1)
          return reject(new Error("Autor não encontrado."));

        const updatedAuthor = {
          ...authors[authorIndex],
          ...authorData,
        };

        const updatedAuthors = [...authors];
        updatedAuthors[authorIndex] = updatedAuthor;

        setAuthors(updatedAuthors);
        resolve();
      }, 500);
    });
  };

  const deleteAuthor = async (authorId: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAuthors(authors.filter((author) => author.id !== authorId));
        resolve();
      }, 500);
    });
  };

  return (
    <AuthorContext.Provider
      value={{
        isLoading,
        authors,
        getAllAuthors,
        getAuthor,
        addAuthor,
        updateAuthor,
        deleteAuthor,
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
};
