import { MemoryRouter } from "react-router";
import { screen } from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import { render } from "../utils/render";
import { mockBooks } from "../../mocks/mockBooks";
import { mockUsers } from "../../mocks/mockUsers";
import { useBooks } from "../../hooks/useBooks";
import { mockBookUser } from "../../mocks/mockBookUser";
import { mockReviews } from "../../mocks/mockReviews";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/useAuth");
vi.mock("../../hooks/useBooks");

describe("BookHeader", () => {
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
    const { default: BookHeader } = await import("../../components/BookHeader");

    return render(
      <MemoryRouter>
        <BookHeader book={mockBooks[0]} />
      </MemoryRouter>
    );
  };

  const mockUseAuth = (user: boolean) => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: user ? mockUsers[0] : undefined,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });
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

  it("should render the book cover and basic layout", async () => {
    mockUseAuth(false);
    mockUseBooks();

    await renderComponent();

    expect(
      screen.getByAltText(`Capa do livro ${mockBooks[0].title}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("rating")).toBeInTheDocument();
    expect(screen.getByTestId("button-bookshelf")).toBeInTheDocument();
  });

  it("should render 'Adicionar à biblioteca' button when the user has not added the book", async () => {
    mockUseAuth(true);
    mockUseBooks();

    await renderComponent();

    const button = screen.getByTestId("button-bookshelf");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Adicionar à biblioteca");
  });

  it("should render the correct button and style when the book is marked as 'Lido'", async () => {
    mockUseAuth(true);
    mockUseBooks({
      getUserBookshelfEntry: vi.fn().mockReturnValue(mockBookUser[1]),
    });

    await renderComponent();

    const button = screen.getByTestId("button-bookshelf");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Lido");
    expect(button).not.toHaveTextContent("Lendo");
    expect(button).not.toHaveTextContent("Quero ler");
  });

  it("should render the correct button and style when the book is marked as 'Quero ler'", async () => {
    mockUseAuth(true);
    mockUseBooks({
      getUserBookshelfEntry: vi.fn().mockReturnValue(mockBookUser[3]),
    });

    await renderComponent();

    const button = screen.getByTestId("button-bookshelf");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Quero ler");
    expect(button).not.toHaveTextContent("Lido");
    expect(button).not.toHaveTextContent("Lendo");
  });

  it("should render the correct button and style when the book is marked as 'Lendo'", async () => {
    mockUseAuth(true);
    mockUseBooks({
      getUserBookshelfEntry: vi.fn().mockReturnValue(mockBookUser[2]),
    });

    await renderComponent();

    const button = screen.getByTestId("button-bookshelf");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Lendo");
    expect(button).not.toHaveTextContent("Quero ler");
    expect(button).not.toHaveTextContent("Lido");
  });

  it("should display the most recent personal rating if it exists", async () => {
    mockUseAuth(true);
    mockUseBooks({
      getUserBookshelfEntry: vi.fn().mockReturnValue(mockBookUser[0]),
      getMostRecentReading: vi.fn().mockReturnValue(mockReviews[0]),
    });

    await renderComponent();

    const ratingElement = screen.getByTestId("rating");

    expect(ratingElement).toBeInTheDocument();
    expect(ratingElement.querySelectorAll("svg.filled-star")).toHaveLength(5);
  });

  it("should open the BookModal when the action button is clicked", async () => {
    mockUseAuth(true);
    mockUseBooks();

    await renderComponent();

    const button = screen.getByTestId("button-bookshelf");
    await userEvent.click(button);

    expect(screen.getByText("Adicionar à Biblioteca")).toBeInTheDocument();
    expect(screen.getByText("Lido")).toBeInTheDocument();
    expect(screen.getByText("Lendo")).toBeInTheDocument();
    expect(screen.getByText("Quero Ler")).toBeInTheDocument();
  });

  it("should call onUpdate and update reading state when the BookModal updates the bookshelf", async () => {
    mockUseAuth(true);
    mockUseBooks({
      getUserBookshelfEntry: vi.fn().mockReturnValue(mockBookUser[2]),
    });

    await renderComponent();

    expect(screen.getByTestId("button-bookshelf")).toHaveTextContent("Lendo");

    await userEvent.click(screen.getByTestId("button-bookshelf"));

    const mockModalButton = screen.getByTestId("button-update-bookshelf-read");
    await userEvent.click(mockModalButton);

    expect(screen.getByTestId("button-bookshelf")).toHaveTextContent("Lido");
  });

  it("should call onUpdate and create a reading state when the BookModal updates the bookshelf", async () => {
    mockUseAuth(true);
    mockUseBooks();

    await renderComponent();

    expect(screen.getByTestId("button-bookshelf")).toHaveTextContent(
      "Adicionar à biblioteca"
    );

    await userEvent.click(screen.getByTestId("button-bookshelf"));

    const mockModalButton = screen.getByTestId("button-update-bookshelf-read");
    await userEvent.click(mockModalButton);

    expect(screen.getByTestId("button-bookshelf")).toHaveTextContent("Lido");
  });

  it("should render zero rating when there is no most recent rating", async () => {
    mockUseAuth(true);
    mockUseBooks({
      getUserBookshelfEntry: vi.fn().mockReturnValue(mockBookUser[0]),
      getMostRecentReading: vi.fn().mockReturnValue(undefined),
    });

    await renderComponent();

    const ratingElement = screen.getByTestId("rating");

    expect(ratingElement).toBeInTheDocument();
    expect(ratingElement.querySelectorAll("svg.outline-star")).toHaveLength(5);
  });
});
