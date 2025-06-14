import { fireEvent, screen } from "@testing-library/react";
import { render } from "../utils/render";
import { MemoryRouter, useNavigate } from "react-router";

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("CallToAction", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("should render call to action for unauthenticated user", async () => {
    const { default: CallToAction } = await import(
      "../../components/CallToAction"
    );

    render(
      <MemoryRouter>
        <CallToAction />
      </MemoryRouter>
    );

    expect(screen.getByTestId("call-to-action")).toBeInTheDocument();
    expect(
      screen.getByText("Junte-se à comunidade Bookland")
    ).toBeInTheDocument();
    expect(screen.getByText("Criar Conta")).toBeInTheDocument();
  });

  it("should not render call to action for authenticated user", async () => {
    const { default: CallToAction } = await import(
      "../../components/CallToAction"
    );

    render(
      <MemoryRouter>
        <CallToAction />
      </MemoryRouter>
    );

    const button = screen.getByText("Criar Conta");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
