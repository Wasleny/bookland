import { screen } from "@testing-library/react";
import { render } from "../../__tests__/utils/render";
import { mockBooks } from "../../mocks/mockBooks";
import BookBadges from ".";

describe("Avatar", () => {
  it("renders with correct texts", () => {
    render(<BookBadges book={mockBooks[10]} />);

    expect(screen.getByText("Fantasia")).toBeInTheDocument();
    expect(screen.getByText("Young Adult (YA)")).toBeInTheDocument();
    expect(screen.getByText("Magic")).toBeInTheDocument();
    expect(screen.getByText("Found Family")).toBeInTheDocument();
    expect(screen.getByText("The Chosen One")).toBeInTheDocument();
  });
});
