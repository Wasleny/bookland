import { screen } from "@testing-library/react";
import { useBooks } from "../../hooks/useBooks";
import { mockReviews } from "../../mocks/mockReviews";
import { render } from "../../__tests__/utils/render";

vi.mock("../../hooks/useBooks");

describe("BookReviews", () => {
  const renderComponent = async (bookId: string) => {
    const { default: BookReviews } = await import(".");

    return render(<BookReviews id={bookId} />);
  };

  const mockUseBooks = (overrides = {}) => {
    const defaultMock = {
      isLoading: false,
      books: [],
      readingsInProgress: [],
      reviews: [],
      bookEntries: [],
      getBooks: vi.fn(),
      getBook: vi.fn(),
      getAllReadingsInProgress: vi.fn(),
      getUserAllReadingsInProgress: vi.fn(),
      getBookReadingInProgress: vi.fn(),
      getReviews: vi.fn(),
      getBookReviews: vi.fn(),
      getUserBookReviews: vi.fn(),
      getAllBookEntries: vi.fn(),
      getUserBookshelfEntry: vi.fn(),
      getUserBookshelfEntries: vi.fn(),
      searchBooks: vi.fn(),
      getMostRecentReading: vi.fn(),
      addBook: vi.fn(),
      updateBook: vi.fn(),
      deleteBook: vi.fn(),

      ...overrides,
    };
    (useBooks as jest.Mock).mockReturnValue(defaultMock);
    return defaultMock;
  };

  it("should render nothing when there are no reviews", async () => {
    mockUseBooks({ reviews: [] });

    await renderComponent("");

    expect(screen.queryByText("Resenhas")).not.toBeInTheDocument();
  });

  it("should render the reviews section when reviews are available", async () => {
    mockUseBooks({
      reviews: mockReviews,
      getBookReviews: vi
        .fn()
        .mockReturnValue(mockReviews.filter((review) => review.book.id === "12")),
    });

    await renderComponent("12");

    expect(screen.queryByText("Resenhas")).toBeInTheDocument();
  });
});
