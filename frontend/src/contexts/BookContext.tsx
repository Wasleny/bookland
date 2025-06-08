import { createContext } from "react";
import type { BookProps } from "../types/book";
import type { ReviewProps } from "../types/review";
import type { Status } from "../types/common";

export interface BookContextType {
  books: BookProps[] | null;
  reviews: ReviewProps[] | null;
  isLoading: boolean;
  getBooks: () => Promise<void>;
  getBook: (id: string) => BookProps | undefined;
  getBookReviews: (bookId: string) => ReviewProps[] | undefined;
  getUserReading: (userId: string, bookId: string) => ReviewProps | undefined;
  getUserReadings: (
    userId: string,
    bookId?: string,
    status?: Status
  ) => ReviewProps[] | undefined;
  searchBooks: (search: string) => BookProps[] | undefined;
}

export const BookContext = createContext<BookContextType>({
  books: null,
  reviews: null,
  isLoading: true,
  getBooks: async () => {},
  getBook: () => undefined,
  getBookReviews: () => undefined,
  getUserReading: () => undefined,
  getUserReadings: () => undefined,
  searchBooks: () => undefined,
});
