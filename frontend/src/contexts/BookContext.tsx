import { createContext } from "react";
import type { BookProps } from "../types/book";
import type { ReviewProps } from "../types/review";
import type { ReadingInProgressProps } from "../types/readingInProgress";
import type { BookUserProps } from "../types/bookUser";

export interface BookContextType {
  isLoading: boolean;
  books: BookProps[] | undefined;
  readingsInProgress: ReadingInProgressProps[] | undefined;
  reviews: ReviewProps[] | undefined;
  bookEntries: BookUserProps[] | undefined;
  getBooks: () => Promise<void>;
  getBook: (bookId: string) => BookProps | undefined;
  getAllReadingsInProgress: () => Promise<void>;
  getUserAllReadingsInProgress: (
    userId: string
  ) => ReadingInProgressProps[] | undefined;
  getBookReadingInProgress: (
    bookId: string,
    userId: string
  ) => ReadingInProgressProps | undefined;
  getReviews: () => Promise<void>;
  getBookReviews: (bookId: string) => ReviewProps[] | undefined;
  getUserBookReviews: (
    bookId: string,
    userId: string
  ) => ReviewProps[] | undefined;
  getAllBookEntries: () => Promise<void>;
  getUserBookshelfEntry: (
    bookId: string,
    userId: string
  ) => BookUserProps | undefined;
  getUserBookshelfEntries: (userId: string) => BookUserProps[] | undefined;
  searchBooks: (search: string) => BookProps[] | undefined;
  getMostRecentReading: (
    bookId: string,
    userId: string
  ) => ReviewProps | undefined;
  addBook: (
    book: Omit<
      BookProps,
      "id" | "averageRating" | "editionCount" | "reviewsCount" | "ratingCount"
    >
  ) => Promise<void>;
  updateBook: (bookId: string, book: Partial<BookProps>) => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
}

export const BookContext = createContext<BookContextType>({
  isLoading: true,
  books: undefined,
  readingsInProgress: undefined,
  reviews: undefined,
  bookEntries: undefined,
  getBooks: async () => {},
  getBook: () => undefined,
  getAllReadingsInProgress: async () => {},
  getUserAllReadingsInProgress: () => undefined,
  getBookReadingInProgress: () => undefined,
  getReviews: async () => {},
  getBookReviews: () => undefined,
  getUserBookReviews: () => undefined,
  getAllBookEntries: async () => {},
  getUserBookshelfEntry: () => undefined,
  getUserBookshelfEntries: () => undefined,
  searchBooks: () => undefined,
  getMostRecentReading: () => undefined,
  addBook: async () => undefined,
  updateBook: async () => undefined,
  deleteBook: async () => undefined,
});
