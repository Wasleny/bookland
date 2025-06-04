import styled from "@emotion/styled";
import type { Breakpoint, Spacing } from "../../types/common";

interface StyledCardProps {
  verticalPadding: Spacing;
  horizontalPadding: Spacing;
  breakpoint: Breakpoint
}

export const StyledCard = styled.div<StyledCardProps>`
  padding: ${({ theme, verticalPadding }) => theme.spacing[verticalPadding]} ${({ theme, horizontalPadding }) => theme.spacing[horizontalPadding]};
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  min-width: ${({ theme }) => theme.sizes.lg};
  width: fit-content;

  @media screen and (max-width: ${({theme, breakpoint}) => theme.breakpoints[breakpoint]}) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;
