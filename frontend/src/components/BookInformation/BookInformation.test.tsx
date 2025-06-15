import { MemoryRouter } from "react-router";
import { mockBooks } from "../../mocks/mockBooks";
import { render } from "../../__tests__/utils/render";
import { screen, within } from "@testing-library/react";

describe("BookInformation", () => {
  const renderComponent = async () => {
    const { default: BookInformation } = await import(".");

    return render(
      <MemoryRouter>
        <BookInformation book={mockBooks[10]} />
      </MemoryRouter>
    );
  };

  it("should render the book title, authors, and synopsis correctly", async () => {
    await renderComponent();

    expect(
      screen.getByRole("heading", { level: 1, name: mockBooks[10].title })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: mockBooks[10].authors[0] })
    ).toBeInTheDocument();
    expect(screen.getByText(mockBooks[10].synopsis ?? "")).toBeInTheDocument();
  });

  it("should render the original title when provided", async () => {
    await renderComponent();

    const dl = screen.getByTestId("edition-details");

    expect(
      within(dl).getByText(mockBooks[10].originalTitle ?? "")
    ).toBeInTheDocument();
  });

  it("should render the series and book number when provided", async () => {
    await renderComponent();

    const seriesLink = screen.getByTestId("series-link");
    expect(seriesLink).toBeInTheDocument();
    expect(seriesLink).toHaveTextContent(
      `${mockBooks[10].series} #${mockBooks[10].bookNumber}`
    );
  });

  it("should render the edition details including pages, format, and language", async () => {
    await renderComponent();

    const dl = screen.getByTestId("edition-details");

    expect(
      within(dl).getByText(
        `${String(mockBooks[10].pages)} páginas, ${mockBooks[10].format}`
      )
    ).toBeInTheDocument();
    expect(
      within(dl).getByText(mockBooks[10].language ?? "")
    ).toBeInTheDocument();
  });

  it("should render ISBN13 and ISBN10 when provided", async () => {
    await renderComponent();

    const dl = screen.getByTestId("edition-details");

    expect(
      within(dl).getByText(`${mockBooks[10].isbn13} (${mockBooks[10].isbn10})`)
    ).toBeInTheDocument();
  });

  it("should render ASIN when provided", async () => {
    await renderComponent();

    const dl = screen.getByTestId("edition-details");

    expect(within(dl).getByText(mockBooks[10].asin ?? "")).toBeInTheDocument();
  });

  it("should render authors name", async () => {
    const { default: BookInformation } = await import(".");

    render(
      <MemoryRouter>
        <BookInformation book={mockBooks[0]} />
      </MemoryRouter>
    );

    const dl = screen.getByTestId("edition-details");

    expect(screen.queryByTestId("series-link")).not.toBeInTheDocument();
    expect(within(dl).queryByText('Série Original')).not.toBeInTheDocument();
    expect(within(dl).queryByText('ASIN')).not.toBeInTheDocument();

  });
});
