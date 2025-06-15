import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { render } from "../../__tests__/utils/render";
import { useAuth } from "../../hooks/useAuth";
import { mockUsers } from "../../mocks/mockUsers";

vi.mock("../../hooks/useAuth");

describe("Banner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as jest.Mock).mockReset();
  });

  const renderComponent = async () => {
    const { default: Banner } = await import(".");

    return render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );
  };

  const configUseAuth = (user: boolean) => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: user ? mockUsers[0] : undefined,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    });
  };

  it("should render the banner with greetings for authenticated users", async () => {
    configUseAuth(true);
    await renderComponent();

    expect(screen.getByText(`Olá, ${mockUsers[0].name}`)).toBeInTheDocument();
    expect(
      screen.getByText(
        "Bem-vinda de volta ao Bookland. Continue sua jornada literária onde parou."
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("O Bookland é sua comunidade literária online.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Descubra novos títulos, acompanhe suas leituras e compartilhe resenhas com amigos."
      )
    ).not.toBeInTheDocument();
  });

  it("should render the generic banner for unauthenticated users", async () => {
    configUseAuth(false);
    await renderComponent();

    expect(
      screen.queryByText(`Olá, ${mockUsers[0].name}`)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Bem-vinda de volta ao Bookland. Continue sua jornada literária onde parou."
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/O Bookland é sua comunidade literária online./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Descubra novos títulos, acompanhe suas leituras e compartilhe resenhas com amigos./
      )
    ).toBeInTheDocument();
  });
});
