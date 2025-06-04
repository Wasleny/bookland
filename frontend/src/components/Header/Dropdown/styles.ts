import styled from "@emotion/styled";

interface StyledDropdownProps {
  position: "right" | "left";
  openDropdown: boolean;
}

export const StyledDropdown = styled.li<StyledDropdownProps>`
  position: relative;

  .dropdown-menu {
    background-color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => theme.spacing.none};
    list-style: none;
    position: absolute;
    right: ${({ theme, position }) =>
      position == "right" ? theme.spacing.none : ""};
    left: ${({ theme, position }) =>
      position == "left" ? theme.spacing.none : ""};
    display: ${({ openDropdown }) => (openDropdown ? "flex" : "none")};
    flex-direction: column;
    width: max-content;
    z-index: 1;

    li {
      padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
      color: ${({ theme }) => theme.colors.textOnInverted};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      font-family: ${({ theme }) => theme.fonts.ui};
      cursor: pointer;

      :hover {
        background-color: ${({ theme }) => theme.colors.primarySoft};
        color: ${({ theme }) => theme.colors.text};
      }
    }
  }

  button {
    background: none;
    border: ${({ theme }) => theme.borders.none};
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textOnInverted};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.secondary};
      transition: color 0.3s ease-in-out;
    }
  }
`;
