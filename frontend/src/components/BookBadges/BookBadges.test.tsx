import { screen } from "@testing-library/react";
import { render } from "../../__tests__/utils/render";
import { mockBooks } from "../../mocks/mockBooks";
import BookBadges from ".";

describe("Avatar", () => {
  it("renders with correct texts", () => {
    render(<BookBadges book={mockBooks[10]} />);

    expect(screen.getByText("Fantasy")).toBeInTheDocument();
    expect(screen.getByText("Young Adult")).toBeInTheDocument();
    expect(screen.getByText("magic")).toBeInTheDocument();
    expect(screen.getByText("found family")).toBeInTheDocument();
    expect(screen.getByText("the chosen one")).toBeInTheDocument();
  });
});
