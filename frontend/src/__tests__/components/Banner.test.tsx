import { screen } from "@testing-library/react";
import { render } from "../utils/render";
import { mockUsers } from "../../mocks/mockUsers";
import { MemoryRouter } from "react-router";

import { useAuth } from "../../hooks/useAuth";

vi.mock("../../hooks/useAuth");

describe("Banner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReset();
  });

  it("should render banner for unauthenticated user", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: mockUsers[0],
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    const { currentUser } = useAuth();

    const { default: Banner } = await import("../../components/Banner");

    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );

    const heading = `Olá, ${currentUser?.name}`;
    const paragraph =
      "Bem-vinda de volta ao Bookland. Continue sua jornada literária onde parou.";

    const banner = await screen.getByTestId("banner");
    expect(banner).toBeInTheDocument();
    expect(screen.getByText(heading)).toBeInTheDocument();
    expect(screen.getByText(paragraph)).toBeInTheDocument();
  });

  it("should render banner for authenticated user", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: null,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });

    const { default: Banner } = await import("../../components/Banner");

    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );

    const heading = "DESCUBRA, LEIA E COMPARTILHE LIVROS";

    const banner = await screen.getByTestId("banner");
    expect(banner).toBeInTheDocument();
    expect(screen.getByText(heading)).toBeInTheDocument();
    expect(
      screen.getByText(
        /O Bookland é sua comunidade literária online\.\s*Descubra novos títulos, acompanhe suas leituras e compartilhe resenhas com amigos\./i
      )
    ).toBeInTheDocument();
  });
});
