import { screen } from "@testing-library/react";
import { render } from "../utils/render";
import { mockUsers } from "../../mocks/mockUsers";
import { MemoryRouter } from "react-router";
const mockedNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

import { useAuth } from "../../hooks/useAuth";

vi.mock("../../hooks/useAuth");

describe("AsideMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReset();
  });

  it("should render all menu items with routes for admin user", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: mockUsers[0],
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    const { default: AsideMenu } = await import("../../components/AsideMenu");

    render(
      <MemoryRouter>
        <AsideMenu />
      </MemoryRouter>
    );

    expect(screen.getByText("Minhas Estantes")).toBeInTheDocument();
    expect(screen.getByText("Gerenciar Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Gerenciar Administradores")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Critérios de Avaliação")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("should not render admin menu items for regular user", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: mockUsers[1],
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    const { default: AsideMenu } = await import("../../components/AsideMenu");

    render(
        <MemoryRouter>
          <AsideMenu />
        </MemoryRouter>
    );

    expect(screen.getByText("Minhas Estantes")).toBeInTheDocument();
    expect(screen.queryByText("Gerenciar Catálogo")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Gerenciar Administradores")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Critérios de Avaliação")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });
});
