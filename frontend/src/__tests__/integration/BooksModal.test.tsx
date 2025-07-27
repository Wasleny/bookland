import userEvent from "@testing-library/user-event";
import { useAuthors } from "../../hooks/useAuthors";
import { useBooks } from "../../hooks/useBooks";
import { useSeries } from "../../hooks/useSeries";
import { mockAuthors } from "../../mocks/mockAuthors";
import { mockBooks } from "../../mocks/mockBooks";
import { mockSeries } from "../../mocks/mockSeries";
import { render } from "../utils/render";
import { fireEvent, screen } from "@testing-library/react";

vi.mock("../../hooks/useBooks");
vi.mock("../../hooks/useAuthors");
vi.mock("../../hooks/useSeries");

describe("BooksModal", () => {
  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = vi.fn();
    window.HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useBooks as jest.Mock).mockReset();
    (useAuthors as jest.Mock).mockReset();
    (useSeries as jest.Mock).mockReset();
  });

  const renderComponent = async (overrides = {}) => {
    const { default: BooksModal } = await import("../../components/BooksModal");

    const defaultProps = {
      isOpen: true,
      setIsOpen: vi.fn(),
      isUpdating: false,
      setIsUpdating: vi.fn(),
      bookId: undefined,
      ...overrides,
    };

    return render(<BooksModal {...defaultProps} />);
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

  const mockUseSeries = (overrides = {}) => {
    const defaultMock = {
      isLoading: false,
      allSeries: mockSeries,
      getAllSeries: vi.fn().mockResolvedValue(mockSeries),
      getSeries: vi.fn(),
      addSeries: vi.fn(),
      updateSeries: vi.fn(),
      deleteSeries: vi.fn(),
      ...overrides,
    };
    (useSeries as jest.Mock).mockReturnValue(defaultMock);
    return defaultMock;
  };

  const mockUseAuthors = (overrides = {}) => {
    const defaultMock = {
      isLoading: false,
      authors: mockAuthors,
      getAllAuthors: vi.fn().mockResolvedValue(mockAuthors),
      getAuthor: vi.fn(),
      addAuthor: vi.fn(),
      updateAuthor: vi.fn(),
      deleteAuthor: vi.fn(),
      ...overrides,
    };
    (useAuthors as jest.Mock).mockReturnValue(defaultMock);
    return defaultMock;
  };

  it("should render the modal with empty form fields when creating a new book", async () => {
    mockUseBooks();
    mockUseAuthors();
    mockUseSeries();

    await renderComponent();

    expect(screen.getByTestId("form-books")).toBeInTheDocument();
    expect(
      screen.getByTestId("form-books").querySelectorAll("input")
    ).toHaveLength(9);
    expect(
      screen.getByTestId("form-books").querySelectorAll("select")
    ).toHaveLength(8);
    expect(
      screen.getByTestId("form-books").querySelectorAll("textarea")
    ).toHaveLength(1);

    expect(screen.getByLabelText("Nome do livro")).toHaveValue("");
    expect(screen.getByLabelText("Nome original do livro")).toHaveValue("");
    expect(screen.getByTestId("select-authors")).toHaveDisplayValue([]);
    expect(screen.getByTestId("select-main-genre")).toHaveValue(
      "Selecione o gênero principal"
    );
    expect(screen.getByTestId("select-secondary-genres")).toHaveDisplayValue(
      []
    );
    expect(screen.getByTestId("select-tropes")).toHaveDisplayValue([]);
    expect(screen.getByTestId("select-series")).toHaveValue(
      "Selecione a série"
    );
    expect(screen.getByTestId("select-original-series")).toHaveValue(
      "Selecione a série original"
    );
    expect(screen.getByLabelText("Ordem do livro na série")).toHaveValue(null);
    expect(screen.getByPlaceholderText("Sinopse do livro")).toHaveValue("");
    expect(screen.getByTestId("select-format")).toHaveValue(
      "Selecione o formato do livro"
    );
    expect(screen.getByLabelText("Quantidade de páginas")).toHaveValue(null);
    expect(screen.getByLabelText("Data de publicação")).toHaveValue("");
    expect(screen.getByLabelText("Editora")).toHaveValue("");
    expect(screen.getByLabelText("ISBN 13")).toHaveValue("");
    expect(screen.getByLabelText("ISBN 10")).toHaveValue("");
    expect(screen.getByLabelText("ASIN")).toHaveValue("");
    expect(screen.getByTestId("select-language")).toHaveValue(
      "Selecione o idioma do livro"
    );
  });

  it("should render the modal with pre-filled form fields when updating a book", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    expect(screen.getByLabelText("Nome do livro")).toHaveValue(
      mockBooks[0].title
    );
    expect(screen.getByTestId("select-authors")).toHaveDisplayValue(
      mockBooks[0].authors || []
    );
    expect(screen.getByTestId("select-main-genre")).toHaveValue(
      mockBooks[0].mainGenre
    );
    expect(screen.getByPlaceholderText("Sinopse do livro")).toHaveValue(
      mockBooks[0].synopsis || ""
    );
    expect(screen.getByTestId("select-format")).toHaveValue(
      mockBooks[0].format || ""
    );
    expect(screen.getByLabelText("Quantidade de páginas")).toHaveValue(
      mockBooks[0].pages || null
    );
    expect(screen.getByLabelText("Data de publicação")).toHaveValue(
      mockBooks[0].publicationDate?.toISOString().split("T")[0] || ""
    );
    expect(screen.getByLabelText("ISBN 13")).toHaveValue(
      mockBooks[0].isbn13 || ""
    );
    expect(screen.getByTestId("select-language")).toHaveValue(
      mockBooks[0].language || ""
    );
  });

  it("should update the title field when user types a new value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("Nome do livro");

    await userEvent.clear(input);
    await userEvent.type(input, "Meu novo título");

    expect(screen.getByLabelText("Nome do livro")).toHaveValue(
      "Meu novo título"
    );
  });

  it("should update the original title field when user types a new value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("Nome original do livro");

    await userEvent.clear(input);
    await userEvent.type(input, "Meu novo título original");

    expect(screen.getByLabelText("Nome original do livro")).toHaveValue(
      "Meu novo título original"
    );
  });

  it("should allow selecting multiple authors from the authors list", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const select = screen.getByTestId("select-authors") as HTMLSelectElement;

    await userEvent.selectOptions(select, [
      "J.R.R. Tolkien",
      "Gabriel García Márquez",
    ]);

    expect(select.selectedOptions).toHaveLength(3);
    expect(select).toHaveValue([
      "Harper Lee",
      "J.R.R. Tolkien",
      "Gabriel García Márquez",
    ]);
  });

  it("should allow selecting the main genre", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const select = screen.getByTestId("select-main-genre") as HTMLSelectElement;

    await userEvent.selectOptions(select, "Fantasia");

    expect(select.selectedOptions).toHaveLength(1);
    expect(select).toHaveValue("Fantasia");
  });

  it("should allow selecting multiple secondary genres", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const select = screen.getByTestId(
      "select-secondary-genres"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(select, ["Ficção", "Distopia"]);

    expect(select.selectedOptions).toHaveLength(2);
    expect(select).toHaveValue(["Ficção", "Distopia"]);
  });

  it("should allow selecting multiple tropes", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const select = screen.getByTestId("select-tropes") as HTMLSelectElement;

    await userEvent.selectOptions(select, ["Magic", "Betrayal"]);

    expect(select.selectedOptions).toHaveLength(2);
    expect(select).toHaveValue(["Magic", "Betrayal"]);
  });

  it("should allow selecting a series", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const select = screen.getByTestId("select-series") as HTMLSelectElement;

    await userEvent.selectOptions(select, "Harry Potter");

    expect(select.selectedOptions).toHaveLength(1);
    expect(select).toHaveValue("Harry Potter");
  });

  it("should allow selecting an original series", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const select = screen.getByTestId(
      "select-original-series"
    ) as HTMLSelectElement;

    await userEvent.selectOptions(select, "Harry Potter");

    expect(select.selectedOptions).toHaveLength(1);
    expect(select).toHaveValue("Harry Potter");
  });

  it("should update the book number field when user inputs a value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("Ordem do livro na série");

    await userEvent.clear(input);
    await userEvent.type(input, "3");

    expect(screen.getByLabelText("Ordem do livro na série")).toHaveValue(3);
  });

  it("should update the synopsis field when user types a new value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByPlaceholderText("Sinopse do livro");

    await userEvent.clear(input);
    await userEvent.type(input, "Nova sinopse do livro");

    expect(screen.getByPlaceholderText("Sinopse do livro")).toHaveValue(
      "Nova sinopse do livro"
    );
  });

  it("should allow selecting the format of the book", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const select = screen.getByTestId("select-format") as HTMLSelectElement;

    await userEvent.selectOptions(select, "paperback");

    expect(select.selectedOptions).toHaveLength(1);
    expect(select).toHaveValue("paperback");
  });

  it("should update the pages field when user inputs a value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("Quantidade de páginas");

    await userEvent.clear(input);
    await userEvent.type(input, "300");

    expect(screen.getByLabelText("Quantidade de páginas")).toHaveValue(300);
  });

  it("should update the publication date field when user selects a date", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("Data de publicação");

    await userEvent.clear(input);
    await userEvent.type(input, "2025-01-01");

    expect(screen.getByLabelText("Data de publicação")).toHaveValue(
      "2025-01-01"
    );
  });

  it("should update the publisher field when user types a value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("Editora");

    await userEvent.clear(input);
    await userEvent.type(input, "Galera");

    expect(screen.getByLabelText("Editora")).toHaveValue("Galera");
  });

  it("should update the ISBN-13 field when user types a value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("ISBN 13");

    await userEvent.clear(input);
    await userEvent.type(input, "0000000000000");

    expect(screen.getByLabelText("ISBN 13")).toHaveValue("0000000000000");
  });

  it("should update the ISBN-10 field when user types a value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("ISBN 10");

    await userEvent.clear(input);
    await userEvent.type(input, "0000000000");

    expect(screen.getByLabelText("ISBN 10")).toHaveValue("0000000000");
  });

  it("should update the ASIN field when user types a value", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const input = screen.getByLabelText("ASIN");

    await userEvent.clear(input);
    await userEvent.type(input, "0000000000");

    expect(screen.getByLabelText("ASIN")).toHaveValue("0000000000");
  });

  it("should allow selecting the language of the book", async () => {
    mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    const select = screen.getByTestId("select-language") as HTMLSelectElement;

    await userEvent.selectOptions(select, "Português");

    expect(select.selectedOptions).toHaveLength(1);
    expect(select).toHaveValue("Português");
  });

  const mockBook = {
    title: "Novo Título",
    originalTitle: "Novo Título Original",
    authors: ["Harper Lee"],
    mainGenre: "Fantasia",
    secondaryGenres: ["Aventura"],
    tropes: ["Found Family", "Magic"],
    synopsis: "Sinopse do novo livro",
    format: "paperback",
    pages: 300,
    publicationDate: "2025-01-01",
    publisher: "Galera",
    isbn13: "9780000000000",
    isbn10: "0000000000",
    asin: "B000000000",
    bookNumber: undefined,
    cover: "",
    series: "",
    originalSeries: "",
    language: "",
  };

  it("should call addBook with correct data when submitting a new book", async () => {
    const booksMock = mockUseBooks();
    mockUseAuthors();
    mockUseSeries();

    await renderComponent();

    fireEvent.change(screen.getByLabelText("Nome do livro"), {
      target: { value: mockBook.title },
    });
    fireEvent.change(screen.getByLabelText("Nome original do livro"), {
      target: { value: mockBook.originalTitle },
    });
    fireEvent.change(screen.getByTestId("select-authors"), {
      target: { value: mockBook.authors },
    });
    fireEvent.change(screen.getByTestId("select-main-genre"), {
      target: { value: mockBook.mainGenre },
    });
    fireEvent.change(screen.getByTestId("select-secondary-genres"), {
      target: { value: mockBook.secondaryGenres },
    });
    await userEvent.selectOptions(
      screen.getByTestId("select-tropes"),
      mockBook.tropes
    );
    fireEvent.change(screen.getByPlaceholderText("Sinopse do livro"), {
      target: { value: mockBook.synopsis },
    });
    fireEvent.change(screen.getByTestId("select-format"), {
      target: { value: mockBook.format },
    });
    fireEvent.change(screen.getByLabelText("Quantidade de páginas"), {
      target: { value: mockBook.pages },
    });
    fireEvent.change(screen.getByLabelText("Data de publicação"), {
      target: { value: mockBook.publicationDate },
    });
    fireEvent.change(screen.getByLabelText("Editora"), {
      target: { value: mockBook.publisher },
    });
    fireEvent.change(screen.getByLabelText("ISBN 13"), {
      target: { value: mockBook.isbn13 },
    });
    fireEvent.change(screen.getByLabelText("ISBN 10"), {
      target: { value: mockBook.isbn10 },
    });
    fireEvent.change(screen.getByLabelText("ASIN"), {
      target: { value: mockBook.asin },
    });

    await userEvent.click(screen.getByText("Criar"));

    expect(booksMock.addBook).toHaveBeenCalledWith({
      ...mockBook,
      publicationDate: new Date(mockBook.publicationDate),
    });
  });

  it("should call updateBook with correct data when updating a book", async () => {
    const booksMock = mockUseBooks({
      getBook: vi.fn().mockReturnValue(mockBooks[0]),
    });
    mockUseAuthors();
    mockUseSeries();

    await renderComponent({
      isUpdating: true,
      setIsUpdating: vi.fn(),
      bookId: mockBooks[0].id,
    });

    fireEvent.change(screen.getByLabelText("Nome do livro"), {
      target: { value: mockBooks[0].title },
    });
    fireEvent.change(screen.getByLabelText("Nome original do livro"), {
      target: { value: mockBooks[0].originalTitle },
    });
    fireEvent.change(screen.getByTestId("select-authors"), {
      target: { value: mockBooks[0].authors },
    });
    fireEvent.change(screen.getByTestId("select-main-genre"), {
      target: { value: mockBooks[0].mainGenre },
    });
    fireEvent.change(screen.getByTestId("select-secondary-genres"), {
      target: { value: mockBooks[0].secondaryGenres },
    });
    await userEvent.selectOptions(
      screen.getByTestId("select-tropes"),
      mockBooks[0].tropes || []
    );
    fireEvent.change(screen.getByPlaceholderText("Sinopse do livro"), {
      target: { value: mockBooks[0].synopsis },
    });
    fireEvent.change(screen.getByTestId("select-format"), {
      target: { value: mockBooks[0].format },
    });
    fireEvent.change(screen.getByLabelText("Quantidade de páginas"), {
      target: { value: mockBooks[0].pages },
    });
    fireEvent.change(screen.getByLabelText("Data de publicação"), {
      target: {
        value: mockBooks[0].publicationDate ? mockBooks[0].publicationDate.toISOString().split("T")[0] : '',
      },
    });
    fireEvent.change(screen.getByLabelText("Editora"), {
      target: { value: mockBooks[0].publisher },
    });
    fireEvent.change(screen.getByLabelText("ISBN 13"), {
      target: { value: mockBooks[0].isbn13 },
    });
    fireEvent.change(screen.getByLabelText("ISBN 10"), {
      target: { value: mockBooks[0].isbn10 },
    });
    fireEvent.change(screen.getByLabelText("ASIN"), {
      target: { value: mockBooks[0].asin },
    });

    await userEvent.click(screen.getByText("Atualizar"));

    expect(booksMock.updateBook).toHaveBeenCalledWith(mockBooks[0].id, {
      ...mockBooks[0],
      publicationDate: mockBooks[0].publicationDate,
      secondaryGenres: [],
    });
  });

  //   it(
  //     "should close the modal and reset form data when cancel button is clicked"
  //   );

  //   it("should handle form submission errors gracefully");
});
