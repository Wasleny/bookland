import { screen } from "@testing-library/react";
import { render } from "../utils/render";
import { mockBooks } from "../../mocks/mockBooks";

describe("BookBadges", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render main genre, secondary genres, and tropes as badges", async () => {
    const { default: BookBadges } = await import("../../components/BookBadges");
    const book = mockBooks[10];

    render(<BookBadges book={book} />);

    expect(screen.findByText('Fantasy'))
    expect(screen.findByText('Young Adult'))
    expect(screen.findByText('magic'))
    expect(screen.findByText('found family'))
    expect(screen.findByText('the chosen one'))
  });
});
