import { useEffect, useState, type ReactNode } from "react";
import { BookContext } from "../contexts/BookContext";
import type { BookProps } from "../types/book";
import type { ReadingInProgressProps } from "../types/readingInProgress";
import type { ReviewProps } from "../types/review";
import type { BookUserProps } from "../types/bookUser";
import { mockBooks } from "../mocks/mockBooks";
import { mockReviews } from "../mocks/mockReviews";
import { mockBookUser } from "../mocks/mockBookUser";
import { mockReadingInProgress } from "../mocks/mockReadingInProgress";
import { normalizeText } from "../utils/normalizeText";

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState<BookProps[]>([]);
  const [readingsInProgress, setReadingsInProgress] = useState<
    ReadingInProgressProps[]
  >([]);
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [bookEntries, setBookEntries] = useState<BookUserProps[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getBooks(),
        getReviews(),
        getAllReadingsInProgress(),
        getAllBookEntries(),
      ]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const getBooks = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBooks(mockBooks);
        resolve();
      }, 500);
    });
  };

  const getBook = (bookId: string) => {
    return books.find((book) => book.id === bookId);
  };

  const getAllReadingsInProgress = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setReadingsInProgress(mockReadingInProgress);
        resolve();
      }, 500);
    });
  };

  const getUserAllReadingsInProgress = (userId: string) => {
    return readingsInProgress.filter((reading) => reading.user.id === userId);
  };

  const getBookReadingInProgress = (bookId: string, userId: string) => {
    return readingsInProgress.find(
      (reading) => reading.user.id === userId && reading.book.id === bookId
    );
  };

  const getReviews = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setReviews(mockReviews);
        resolve();
      }, 500);
    });
  };

  const getBookReviews = (bookId: string) => {
    return reviews.filter((review) => review.book.id === bookId);
  };

  const getUserBookReviews = (bookId: string, userId: string) => {
    return reviews.filter(
      (review) => review.book.id === bookId && review.user.id === userId
    );
  };

  const getAllBookEntries = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBookEntries(mockBookUser);
        resolve();
      }, 500);
    });
  };

  const getUserBookshelfEntry = (bookId: string, userId: string) => {
    return bookEntries.find(
      (bookEntry) =>
        bookEntry.book.id === bookId && bookEntry.user.id === userId
    );
  };

  const getUserBookshelfEntries = (userId: string) => {
    return bookEntries.filter((bookEntry) => bookEntry.user.id === userId);
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

  const getMostRecentReading = (bookId: string, userId: string) => {
    return reviews.find(
      (review) =>
        review.book.id === bookId &&
        review.user.id === userId &&
        review.mostRecentReading
    );
  };

  const addBook = async (
    bookData: Omit<
      BookProps,
      "id" | "averageRating" | "editionCount" | "reviewsCount" | "ratingCount"
    >
  ) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newBook: BookProps = {
          id: `book-${Date.now()}`,
          ...bookData,
        };
        setBooks((prev) => [...prev, newBook]);
        resolve();
      }, 500);
    });
  };

  const updateBook = async (bookId: string, bookData: Partial<BookProps>) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const bookIndex = books.findIndex((book) => book.id === bookId);

        if (bookIndex === -1) return reject(new Error("Livro não encontrado."));

        const updatedBook = {
          ...books[bookIndex],
          ...bookData,
        };

        const updatedBooks = [...books];
        updatedBooks[bookIndex] = updatedBook;

        setBooks(updatedBooks);
        resolve();
      }, 500);
    });
  };

  const deleteBook = async (bookId: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBooks(books.filter((book) => book.id !== bookId));
        resolve();
      }, 500);
    });
  };

  return (
    <BookContext.Provider
      value={{
        isLoading,
        books,
        readingsInProgress,
        reviews,
        bookEntries,
        getBooks,
        getBook,
        getAllReadingsInProgress,
        getUserAllReadingsInProgress,
        getBookReadingInProgress,
        getReviews,
        getBookReviews,
        getUserBookReviews,
        getAllBookEntries,
        getUserBookshelfEntry,
        getUserBookshelfEntries,
        searchBooks,
        getMostRecentReading,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
