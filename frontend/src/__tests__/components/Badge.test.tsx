import { screen } from "@testing-library/react";
import { render } from "../utils/render";

describe("Badge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the genre badge", async () => {
    const { default: Badge } = await import("../../components/Badge");

    render(
        <Badge type="genre">Fantasia</Badge>
    );

    const badge = await screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
  });
});
