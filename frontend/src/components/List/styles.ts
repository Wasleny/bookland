import styled from "@emotion/styled";
import type { ListProps } from ".";

export const StyledList = styled.ul<ListProps>`
  padding: 0;
  list-style: none;
  display: ${({ display }) => display};
  align-items: ${({ display }) => (display === "flex" ? "center" : "")};
  gap: ${({ theme, gap }) => theme.spacing[gap]};
  color: ${({ theme }) => theme.colors.textOnInverted};
  font-family: ${({ theme }) => theme.fonts.ui};

  & > li:hover > a {
    color: ${({ theme }) => theme.colors.secondary};
    transition: color 0.3s ease-in-out;
  }
`;
