import { screen } from "@testing-library/react";
import { render } from "../utils/render";
const mockedNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock("../../hooks/useAuth");

describe("Avatar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the avatar image", async () => {
    const { default: Avatar } = await import("../../components/Avatar");

    render(
        <Avatar path="caminho" />
    );

    const img = await screen.findByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "caminho");
    expect(img).toHaveAttribute("alt", "Avatar do usuário");
  });
});
