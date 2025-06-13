import { screen } from "@testing-library/react";
import { render } from "../utils/render";
import { MemoryRouter } from "react-router";

describe("Badge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the genre badge", async () => {
    const { default: Badge } = await import("../../components/Badge");

    render(
      <MemoryRouter>
        <Badge type="genre">Fantasia</Badge>
      </MemoryRouter>
    );

    const badge = await screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
  });
});
