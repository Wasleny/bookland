import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { render } from "../../__tests__/utils/render";
import { useAuth } from "../../hooks/useAuth";
import { mockUsers } from "../../mocks/mockUsers";

vi.mock("../../hooks/useAuth");

describe("AsideMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReset();
  });

  const renderComponent = async () => {
    const { default: AsideMenu } = await import(".");

    return render(
      <MemoryRouter>
        <AsideMenu />
      </MemoryRouter>
    );
  };

  const configUseAuth = (admin: boolean) => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: admin ? mockUsers[0] : mockUsers[1],
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });
  };

  it('should render the title "Acesso Rápido"', async () => {
    configUseAuth(true);
    await renderComponent();

    expect(screen.getByText("Acesso Rápido")).toBeInTheDocument();
  });

  it("should render the menu items from bookMenu", async () => {
    configUseAuth(true);
    await renderComponent();

    expect(screen.getByText("Minhas Estantes")).toBeInTheDocument();
  });

  it("should render the menu items from userMenu", async () => {
    configUseAuth(true);
    await renderComponent();

    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Critérios de Avaliação")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("should render the managementMenu items when the user is admin", async () => {
    configUseAuth(true);
    await renderComponent();

    expect(screen.getByText("Gerenciar Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Gerenciar Administradores")).toBeInTheDocument();
  });

  it("should not render the managementMenu items when the user is not admin", async () => {
    configUseAuth(false);
    await renderComponent();

    expect(screen.queryByText("Gerenciar Catálogo")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Gerenciar Administradores")
    ).not.toBeInTheDocument();
  });

  it('should render the links with the correct "to" attribute for each menu item', async () => {
    configUseAuth(true);
    await renderComponent();

    expect(screen.getByText("Minhas Estantes")).toHaveAttribute(
      "href",
      "/my-shelves"
    );
    expect(screen.getByText("Perfil")).toHaveAttribute("href", "/profile");
    expect(screen.getByText("Critérios de Avaliação")).toHaveAttribute(
      "href",
      "/rating-criteria"
    );
    expect(screen.getByText("Sair")).toHaveAttribute("href", "/");
    expect(screen.getByText("Gerenciar Catálogo")).toHaveAttribute(
      "href",
      "/admin/manage-catalog"
    );
    expect(screen.getByText("Gerenciar Administradores")).toHaveAttribute(
      "href",
      "/admin/manage-admins"
    );
  });
});
