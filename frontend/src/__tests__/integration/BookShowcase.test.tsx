import { MemoryRouter } from "react-router";
import { screen } from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import { render } from "../utils/render";
import { mockBooks } from "../../mocks/mockBooks";
import { useBooks } from "../../hooks/useBooks";

vi.mock("../../hooks/useAuth");
vi.mock("../../hooks/useBooks");

describe("BookShowcase", () => {
  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = vi.fn();
    window.HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as jest.Mock).mockReset();
    (useBooks as jest.Mock).mockReset();
  });

  const renderComponent = async () => {
    const { default: BookShowcase } = await import(
      "../../components/BookShowcase"
    );

    return render(
      <MemoryRouter>
        <BookShowcase />
      </MemoryRouter>
    );
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

  it("should render the loading state when books are loading", async () => {
    mockUseBooks({
      isLoading: true,
    });

    await renderComponent();

    expect(screen.getByText("Carregando destaques...")).toBeInTheDocument();
  });

  it("should render nothing when books are undefined", async () => {
    mockUseBooks({
      books: undefined,
      isLoading: false,
    });

    await renderComponent();

    expect(screen.queryByTestId("book-showcase")).not.toBeInTheDocument();
  });

  it("should render the correct number of books in the carousel", async () => {
    mockUseBooks({
      books: mockBooks,
      isLoading: false,
    });

    await renderComponent();

    expect(
      screen.getByTestId("book-showcase").querySelectorAll("img")
    ).toHaveLength(16);
  });
});
