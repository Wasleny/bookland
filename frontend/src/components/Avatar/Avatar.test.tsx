import { screen } from "@testing-library/react";
import Avatar from ".";
import { render } from "../../__tests__/utils/render";

describe("Avatar", () => {
  it("renders with correct src and alt text", () => {
    render(<Avatar path="path/to/avatar.svg" />);

    const img = screen.getByAltText("Avatar do usuário");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "path/to/avatar.svg");
  });
});
