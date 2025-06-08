import { useEffect, useState, type ReactNode } from "react";
import type { BookProps } from "../types/book";
import { BookContext } from "../contexts/BookContext";
import mockBooks from "../mocks/mockBooks";
import type { ReviewProps } from "../types/review";
import mockReviews from "../mocks/mockReviews";
import type { Status } from "../types/common";
import { normalizeText } from "../utils/normalizeText";

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    getBooks();
    getReviews();
  }, []);

  const getBooks = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBooks(mockBooks);
        resolve();
      }, 500);
    });
  };

  const getBook = (id: string): BookProps | undefined => {
    return books.find((book) => book.id === id);
  };

  const getBookReviews = (bookId: string) => {
    return reviews.filter(
      (review) =>
        review.body && review.book.id === bookId && review.status === "read"
    );
  };

  const getUserReading = (userId: string, bookId: string) => {
    return reviews.find(
      (review) => review.book.id === bookId && review.user.id == userId
    );
  };

  const getUserReadings = (
    userId: string,
    bookId?: string,
    status?: Status
  ) => {
    const filteredReviews =
      reviews.filter((review) => review.user.id === userId) ?? [];

    if (bookId)
      return filteredReviews.filter((review) => review.book.id === bookId);
    else if (status)
      return filteredReviews.filter((review) => review.status === status);

    return filteredReviews;
  };

  const searchBooks = (search: string) => {
    const normalizedSearch = normalizeText(search);

    return books.filter((book) => {
      const normalizedTitle = normalizeText(book.title);
      const normalizedSeries = book.series ? normalizeText(book.series) : "";
      const normalizedAuthors = book.authors?.map((author) =>
        normalizeText(author)
      );

      return (
        book.asin?.includes(normalizedSearch) ||
        book.isbn10?.includes(normalizedSearch) ||
        book.isbn13?.includes(normalizedSearch) ||
        normalizedTitle.includes(normalizedSearch) ||
        normalizedSeries.includes(normalizedSearch) ||
        normalizedAuthors?.some((author) => author.includes(normalizedSearch))
      );
    });
  };

  const getReviews = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setReviews(mockReviews ?? []);
        resolve();
      }, 500);
    });
  };

  return (
    <BookContext.Provider
      value={{
        books,
        getBooks,
        getBook,
        reviews,
        getBookReviews,
        getUserReading,
        getUserReadings,
        searchBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
