import { screen } from "@testing-library/react";
import { render } from "../../__tests__/utils/render";
import Badge from ".";

describe("Badge", () => {
  it("renders with correct text", () => {
    render(<Badge type="genre">Fantasy</Badge>);

    expect(screen.getByText("Fantasy")).toBeInTheDocument();
  });
});
