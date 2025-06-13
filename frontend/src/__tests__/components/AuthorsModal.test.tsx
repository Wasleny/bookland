import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../utils/render";
import { mockUsers } from "../../mocks/mockUsers";

import { useAuth } from "../../hooks/useAuth";
import { useAuthors } from "../../hooks/useAuthors";

vi.mock("../../hooks/useAuth");
vi.mock("../../hooks/useAuthors");

describe("AuthorsModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReset();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  afterAll(() => {
    HTMLDialogElement.prototype.showModal = undefined as unknown as () => void;
    HTMLDialogElement.prototype.close = undefined as unknown as () => void;
  });

  it("should render modal", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: mockUsers[0],
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    (useAuthors as jest.Mock).mockReturnValue({
      addAuthor: vi.fn(),
      updateAuthor: vi.fn(),
      getAuthor: vi.fn(),
    });

    const { default: AuthorsModal } = await import(
      "../../components/AuthorsModal"
    );
    const mockSetIsOpen = vi.fn();

    render(<AuthorsModal isOpen={true} setIsOpen={mockSetIsOpen} />);

    expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
    expect(screen.getByLabelText("Nome do(a) Autor(a)")).toBeInTheDocument();
    expect(screen.getByLabelText("Nacionalidade")).toBeInTheDocument();
    userEvent.click(screen.getByText("Cancelar"));
    expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute(
      "open"
    );
  });

  it("should call addAuthor on submit", async () => {
    const mockAddAuthor = vi.fn().mockResolvedValue(undefined);
    const mockUpdateAuthor = vi.fn().mockResolvedValue(undefined);
    const mockGetAuthor = vi.fn().mockResolvedValue(undefined);

    (useAuthors as jest.Mock).mockReturnValue({
      addAuthor: mockAddAuthor,
      updateAuthor: mockUpdateAuthor,
      getAuthor: mockGetAuthor,
    });

    const { default: AuthorsModal } = await import(
      "../../components/AuthorsModal"
    );
    const mockSetIsOpen = vi.fn();

    render(<AuthorsModal isOpen={true} setIsOpen={mockSetIsOpen} />);

    await userEvent.type(
      screen.getByLabelText("Nome do(a) Autor(a)"),
      "João Silva"
    );
    await userEvent.type(screen.getByLabelText("Nacionalidade"), "Brasileiro");

    await userEvent.click(screen.getByText("Criar"));

    await waitFor(() => {
      expect(mockAddAuthor).toHaveBeenCalledWith({
        name: "João Silva",
        nationality: "Brasileiro",
      });
    });
  });

  it("should call updateAuthor on submit", async () => {
    const mockAddAuthor = vi.fn().mockResolvedValue(undefined);
    const mockUpdateAuthor = vi.fn().mockResolvedValue(undefined);
    const mockGetAuthor = vi.fn().mockResolvedValue(undefined);

    (useAuthors as jest.Mock).mockReturnValue({
      addAuthor: mockAddAuthor,
      updateAuthor: mockUpdateAuthor,
      getAuthor: mockGetAuthor,
    });

    const { default: AuthorsModal } = await import(
      "../../components/AuthorsModal"
    );
    const mockSetIsOpen = vi.fn();
    const mockSetIsUpdating = vi.fn();

    render(
      <AuthorsModal
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        authorId="author-1"
        isUpdating={true}
        setIsUpdating={mockSetIsUpdating}
      />
    );

    await userEvent.type(
      screen.getByLabelText("Nome do(a) Autor(a)"),
      "João Silva"
    );
    await userEvent.type(screen.getByLabelText("Nacionalidade"), "Brasileiro");

    await userEvent.click(screen.getByText("Criar"));

    await waitFor(() => {
      expect(mockUpdateAuthor).toHaveBeenCalledWith("author-1", {
        name: "João Silva",
        nationality: "Brasileiro",
      });
    });
  });

  it("should not call updateAuthor if authorId is missing when isUpdating is true", async () => {
    const mockAddAuthor = vi.fn().mockResolvedValue(undefined);
    const mockUpdateAuthor = vi.fn().mockResolvedValue(undefined);
    const mockGetAuthor = vi.fn().mockResolvedValue(undefined);

    (useAuthors as jest.Mock).mockReturnValue({
      addAuthor: mockAddAuthor,
      updateAuthor: mockUpdateAuthor,
      getAuthor: mockGetAuthor,
    });

    const { default: AuthorsModal } = await import(
      "../../components/AuthorsModal"
    );
    const mockSetIsOpen = vi.fn();
    const mockSetIsUpdating = vi.fn();

    render(
      <AuthorsModal
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        isUpdating={true}
        setIsUpdating={mockSetIsUpdating}
      />
    );

    await userEvent.type(
      screen.getByLabelText("Nome do(a) Autor(a)"),
      "João Silva"
    );
    await userEvent.type(screen.getByLabelText("Nacionalidade"), "Brasileiro");

    await userEvent.click(screen.getByText("Criar"));

    await waitFor(() => {
      expect(mockUpdateAuthor).not.toHaveBeenCalledWith();
    });
  });

  it("should log error when addAuthor throws", async () => {
    const error = new Error("Erro");
    const mockAddAuthor = vi.fn().mockRejectedValue(error);

    (useAuthors as jest.Mock).mockReturnValue({
      addAuthor: mockAddAuthor,
      updateAuthor: vi.fn(),
      getAuthor: vi.fn(),
    });

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { default: AuthorsModal } = await import(
      "../../components/AuthorsModal"
    );
    const mockSetIsOpen = vi.fn();

    render(<AuthorsModal isOpen={true} setIsOpen={mockSetIsOpen} />);

    await userEvent.type(
      screen.getByLabelText("Nome do(a) Autor(a)"),
      "João Silva"
    );
    await userEvent.type(screen.getByLabelText("Nacionalidade"), "Brasileiro");

    await userEvent.click(screen.getByText("Criar"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro ao executar solicitação",
        error
      );
    });

    consoleSpy.mockRestore();
  });

  it("should populate fields when updating an author", async () => {
    const mockAuthor = { name: "Autor X", nationality: "Nacionalidade X" };
    const mockGetAuthor = vi.fn().mockReturnValue(mockAuthor);

    (useAuthors as jest.Mock).mockReturnValue({
      addAuthor: vi.fn(),
      updateAuthor: vi.fn(),
      getAuthor: mockGetAuthor,
    });

    const { default: AuthorsModal } = await import(
      "../../components/AuthorsModal"
    );
    const mockSetIsOpen = vi.fn();
    const mockSetIsUpdating = vi.fn();

    render(
      <AuthorsModal
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        isUpdating={true}
        setIsUpdating={mockSetIsUpdating}
        authorId="author-1"
      />
    );

    expect(screen.getByLabelText("Nome do(a) Autor(a)")).toHaveValue("Autor X");
    expect(screen.getByLabelText("Nacionalidade")).toHaveValue(
      "Nacionalidade X"
    );
  });
});
