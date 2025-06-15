import { render } from "../../__tests__/utils/render";
import { screen, waitFor } from "@testing-library/react";
import { useAuthors } from "../../hooks/useAuthors";
import userEvent from "@testing-library/user-event";

vi.mock("../../hooks/useAuthors");

describe("AuthorsModal", () => {
  const mockAuthor = {
    id: "author-1",
    name: "Sarah J. Maas",
    nationality: "Estados Unidos",
  };

  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = vi.fn();
    window.HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseAuthors();
  });

  const mockUseAuthors = (overrides = {}) => {
    const defaultMock = {
      addAuthor: vi.fn(),
      updateAuthor: vi.fn(),
      getAuthor: vi.fn(),
      deleteAuthor: vi.fn(),
      getAllAuthors: vi.fn(),
      authors: [],
      isLoading: false,
      ...overrides,
    };
    (useAuthors as jest.Mock).mockReturnValue(defaultMock);
    return defaultMock;
  };

  const mockSetIsOpen = vi.fn();
  const renderComponent = async (authorId: string) => {
    const { default: AuthorsModal } = await import("./index");

    return render(
      authorId !== "" ? (
        <AuthorsModal
          isOpen={true}
          setIsOpen={mockSetIsOpen}
          isUpdating={true}
          setIsUpdating={vi.fn()}
          authorId={authorId}
        />
      ) : (
        <AuthorsModal isOpen={true} setIsOpen={mockSetIsOpen} />
      )
    );
  };

  it("should display 'Cadastre um autor' title when not in update mode", async () => {
    await renderComponent("");

    expect(screen.getByText("Cadastre um autor")).toBeInTheDocument();
  });

  it("should display 'Edit an author' title when in update mode", async () => {
    await renderComponent(mockAuthor.id);

    expect(screen.getByText("Edite um autor")).toBeInTheDocument();
  });

  it("should pre-fill the form fields with author data when in update mode", async () => {
    mockUseAuthors({
      getAuthor: vi.fn().mockReturnValue(mockAuthor),
    });

    await renderComponent(mockAuthor.id);

    expect(screen.getByLabelText("Nome do(a) Autor(a)")).toHaveValue(
      mockAuthor.name
    );
    expect(screen.getByLabelText("Nacionalidade")).toHaveValue(
      mockAuthor.nationality
    );
  });

  it("should allow typing in the name and nationality fields", async () => {
    await renderComponent("");

    const nameInput = screen.getByLabelText("Nome do(a) Autor(a)");
    const nationalityInput = screen.getByLabelText("Nacionalidade");

    await userEvent.type(nameInput, mockAuthor.name);
    await userEvent.type(nationalityInput, mockAuthor.nationality);

    expect(nameInput).toHaveValue(mockAuthor.name);
    expect(nationalityInput).toHaveValue(mockAuthor.nationality);
  });

  it("should call addAuthor when submitting the form in creation mode", async () => {
    await renderComponent("");

    await userEvent.type(
      screen.getByLabelText("Nome do(a) Autor(a)"),
      mockAuthor.name
    );
    await userEvent.type(
      screen.getByLabelText("Nacionalidade"),
      mockAuthor.nationality
    );

    await userEvent.click(screen.getByText("Criar"));
    expect(useAuthors().addAuthor).toHaveBeenCalledWith({
      name: mockAuthor.name,
      nationality: mockAuthor.nationality,
    });
  });

  it("should call updateAuthor when submitting the form in update mode", async () => {
    await renderComponent(mockAuthor.id);

    await userEvent.type(
      screen.getByLabelText("Nome do(a) Autor(a)"),
      mockAuthor.name
    );
    await userEvent.type(
      screen.getByLabelText("Nacionalidade"),
      mockAuthor.nationality
    );

    await userEvent.click(screen.getByText("Criar"));
    expect(useAuthors().updateAuthor).toHaveBeenCalledWith(mockAuthor.id, {
      name: mockAuthor.name,
      nationality: mockAuthor.nationality,
    });
  });

  it("should clear the form and close the modal after successful submission", async () => {
    await renderComponent(mockAuthor.id);

    const nameInput = screen.getByLabelText("Nome do(a) Autor(a)");
    const nationalityInput = screen.getByLabelText("Nacionalidade");

    await userEvent.type(nameInput, mockAuthor.name);
    await userEvent.type(nationalityInput, mockAuthor.nationality);

    await userEvent.click(screen.getByText("Criar"));

    await waitFor(() => {
      expect(useAuthors().updateAuthor).toHaveBeenCalledWith(mockAuthor.id, {
        name: mockAuthor.name,
        nationality: mockAuthor.nationality,
      });
    });

    expect(nameInput).toHaveValue("");
    expect(nationalityInput).toHaveValue("");
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("should close the modal and reset state when clicking 'Cancelar'", async () => {
    await renderComponent(mockAuthor.id);

    await userEvent.click(screen.getByText("Cancelar"));
    expect(screen.getByLabelText("Nome do(a) Autor(a)")).toHaveValue("");
    expect(screen.getByLabelText("Nacionalidade")).toHaveValue("");
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it("should handle submission errors gracefully without breaking the app", async () => {
    mockUseAuthors({
      addAuthor: vi
        .fn()
        .mockRejectedValue(new Error("Erro ao executar solicitação")),
    });

    await renderComponent("");

    const consoleErrorSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    await userEvent.click(screen.getByText("Criar"));

    await waitFor(() => {
      expect(useAuthors().addAuthor).toHaveBeenCalled();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Erro ao executar solicitação"),
      expect.anything()
    );

    consoleErrorSpy.mockRestore();
  });

  it('should to not call "updateAuthor" if authorId is not provided', async () => {
    const { default: AuthorsModal } = await import("./index");

    render(
      <AuthorsModal
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        isUpdating={true}
        setIsUpdating={vi.fn()}
      />
    );

    await userEvent.click(screen.getByText("Criar"));

    expect(useAuthors().updateAuthor).not.toHaveBeenCalled();
  });
});
