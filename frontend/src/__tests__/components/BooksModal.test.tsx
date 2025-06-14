import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../utils/render";

import { useAuth } from "../../hooks/useAuth";
import { useBooks } from "../../hooks/useBooks";
import { useAuthors } from "../../hooks/useAuthors";
import { useSeries } from "../../hooks/useSeries";

import { mockSeries } from "../../mocks/mockSeries";
import { mockAuthors } from "../../mocks/mockAuthors";
import { mockUsers } from "../../mocks/mockUsers";

vi.mock("../../hooks/useAuth");
vi.mock("../../hooks/useBooks");
vi.mock("../../hooks/useAuthors");
vi.mock("../../hooks/useSeries");

describe("BooksModal", () => {
  let mockAddBook: ReturnType<typeof vi.fn>;
  let mockUpdateBook: ReturnType<typeof vi.fn>;
  let mockGetBook: ReturnType<typeof vi.fn>;

  let mockSetIsOpen: ReturnType<typeof vi.fn>;
  let mockSetIsUpdating: ReturnType<typeof vi.fn>;

  const adminUser = mockUsers[0];

  const bookToSimulate = {
    title: "Trono de Vidro",
    originalTitle: "Throne of Glass",
    authors: ["Sarah J. Maas"],
    mainGenre: "Fantasia",
    secondaryGenres: ["Romance", "Young Adult (YA)"],
    tropes: ["Magic", "Tournament"],
    series: "Trono de Vidro",
    originalSeries: "Throne of Glass",
    bookNumber: 1,
    synopis:
      "A magia há muito abandonou Adarlan. Um perverso rei governa, punindo impiedosamente as minorias rebeldes. Aos 18 anos uma prisioneira está cumprindo sua sentença. Ela é uma assassina, e a melhor de Adarlan. Aprisionada e fraca, ela está quase perdendo as esperanças, a sentença de morte é iminente, mas a jovem recebe uma proposta inesperada: representar o príncipe em uma competição com lutando contra os mais habilidosos assassinos e larápios do reino. Mas ela não diz sim apenas para matar, seu foco é obter sua liberdade de volta. Se derrotar os 23 assassinos, ladrões e soldados, será a campeã do rei e estará livre depois de servi-lo por alguns anos. Endovier é uma sentença de morte, e cada duelo em Adarlan será para viver ou morrer. Mas se o preço é ser livre, e ela está disposta a tudo. Seu nome é Celaena Sardothien. O príncipe herdeiro vai provocá-la, o capitão da guarda fará tudo para protegê-la. E uma princesa de terras distantes se tornará algo que Celaena jamais pensou ter novamente: uma amiga. Mas algo maligno habita o castelo – e está ali para matar. Quando os demais competidores começam a morrer, um a um e de maneira terrível, Celaena se vê mais uma vez envolvida em uma batalha pela sobrevivência e inicia uma jornada desesperada para desvendar a origem daquele mal antes que ele destrua o mundo dela. E sua única chance de ser livre.",
    format: "paperback",
    pages: 392,
    publicationDate: new Date("2012-08-07"),
    publisher: "Galera",
    isbn13: "9788501100573",
    isbn10: "8501100579",
    asin: "B00FACP8NC",
    language: "Português",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    mockAddBook = vi.fn().mockResolvedValue(undefined);
    mockUpdateBook = vi.fn().mockResolvedValue(undefined);
    mockGetBook = vi.fn().mockResolvedValue(undefined);
    mockSetIsOpen = vi.fn();
    mockSetIsUpdating = vi.fn();

    (useAuth as jest.Mock).mockReturnValue({
      currentUser: adminUser,
    });

    (useBooks as jest.Mock).mockReturnValue({
      addBook: mockAddBook,
      updateBook: mockUpdateBook,
      getBook: mockGetBook,
    });

    (useSeries as jest.Mock).mockReturnValue({
      allSeries: mockSeries,
    });

    (useAuthors as jest.Mock).mockReturnValue({
      authors: mockAuthors,
    });
  });

  afterAll(() => {
    HTMLDialogElement.prototype.showModal = undefined as unknown as () => void;
    HTMLDialogElement.prototype.close = undefined as unknown as () => void;
  });

  const renderBooksModal = async (props = {}) => {
    const { default: BooksModal } = await import("../../components/BooksModal");

    return render(
      <BooksModal isOpen={true} setIsOpen={mockSetIsOpen} {...props} />
    );
  };

  const simulateUser = async () => {
    const user = userEvent.setup({ delay: 0 });

    await user.type(
      screen.getByLabelText("Nome do livro"),
      bookToSimulate.title
    );
    await user.type(
      screen.getByLabelText("Nome original do livro"),
      bookToSimulate.originalTitle
    );
    await user.type(
      screen.getByLabelText("Ordem do livro na série"),
      String(bookToSimulate.bookNumber)
    );
    await user.type(
      screen.getByLabelText("Quantidade de páginas"),
      String(bookToSimulate.pages)
    );
    await user.type(
      screen.getByLabelText("Data de publicação"),
      bookToSimulate.publicationDate.toISOString().split("T")[0]
    );
    await user.type(screen.getByLabelText("Editora"), bookToSimulate.publisher);
    await user.type(screen.getByLabelText("ISBN 13"), bookToSimulate.isbn13);
    await user.type(screen.getByLabelText("ISBN 10"), bookToSimulate.isbn10);
    await user.type(screen.getByLabelText("ASIN"), bookToSimulate.asin);
    await user.type(
      screen.getByPlaceholderText("Sinopse do livro"),
      bookToSimulate.synopis
    );
    await user.selectOptions(
      screen.getByTestId("select-authors"),
      bookToSimulate.authors
    );
    await user.selectOptions(
      screen.getByTestId("select-main-genre"),
      bookToSimulate.mainGenre
    );
    await user.selectOptions(
      screen.getByTestId("select-secondary-genres"),
      bookToSimulate.secondaryGenres
    );
    await user.selectOptions(
      screen.getByTestId("select-tropes"),
      bookToSimulate.tropes
    );
    await user.selectOptions(
      screen.getByTestId("select-series"),
      bookToSimulate.series
    );
    await user.selectOptions(
      screen.getByTestId("select-original-series"),
      bookToSimulate.originalSeries
    );
    await user.selectOptions(
      screen.getByTestId("select-format"),
      bookToSimulate.format
    );
    await user.selectOptions(
      screen.getByTestId("select-language"),
      bookToSimulate.language
    );

    await user.click(screen.getByText("Criar"));
  };

  it("should render modal", async () => {
    await renderBooksModal();

    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
    userEvent.click(screen.getByText("Cancelar"));
    expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute(
      "open"
    );

    expect(screen.getByLabelText("Nome do livro")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome original do livro")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ordem do livro na série")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Quantidade de páginas")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de publicação")).toBeInTheDocument();
    expect(screen.getByLabelText("Editora")).toBeInTheDocument();
    expect(screen.getByLabelText("ISBN 13")).toBeInTheDocument();
    expect(screen.getByLabelText("ISBN 10")).toBeInTheDocument();
    expect(screen.getByLabelText("ASIN")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Sinopse do livro")).toBeInTheDocument();

    expect(screen.getByTestId("select-authors")).toBeInTheDocument();
    expect(screen.getByTestId("select-main-genre")).toBeInTheDocument();
    expect(screen.getByTestId("select-secondary-genres")).toBeInTheDocument();
    expect(screen.getByTestId("select-tropes")).toBeInTheDocument();
    expect(screen.getByTestId("select-series")).toBeInTheDocument();
    expect(screen.getByTestId("select-original-series")).toBeInTheDocument();
    expect(screen.getByTestId("select-format")).toBeInTheDocument();
    expect(screen.getByTestId("select-language")).toBeInTheDocument();
  });

  it("should call addBook on submit", async () => {
    await renderBooksModal();
    await simulateUser();

    await waitFor(() => {
      expect(mockAddBook).toHaveBeenCalled();
    });
  }, 30000);

  it("should not call updateBook if bookId is missing when isUpdating is true", async () => {
    const { default: BooksModal } = await import("../../components/BooksModal");

    render(
      <BooksModal
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        isUpdating={true}
        setIsUpdating={mockSetIsUpdating}
      />
    );

    await simulateUser();

    await waitFor(() => {
      expect(mockUpdateBook).not.toHaveBeenCalledWith();
    });
  }, 30000);
});
