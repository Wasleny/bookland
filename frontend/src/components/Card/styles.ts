import styled from "@emotion/styled";
import type {
  Breakpoint,
  FlexDirection,
  JustifyContent,
  Spacing,
  Width,
} from "../../types/common";

interface StyledCardProps {
  verticalPadding: Spacing;
  horizontalPadding: Spacing;
  breakpoint: Breakpoint;
  flexDirection: FlexDirection;
  width: Width | null;
  gap: Spacing | null;
  justifyContent: JustifyContent | null;
}

export const StyledCard = styled.div<StyledCardProps>`
display: flex;
  padding: ${({ theme, verticalPadding, horizontalPadding }) =>
    `${theme.spacing[verticalPadding]} ${theme.spacing[horizontalPadding]}`};
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  min-width: ${({ theme }) => theme.sizes.lg};
  width: ${({ theme, width }) => (width ? theme.sizes[width] : "fit-content")};
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: ${({ gap, theme }) => (gap ? theme.spacing[gap] : null)};
  justify-content: ${({ justifyContent }) => justifyContent};

  @media screen and (max-width: ${({ theme, breakpoint }) => theme.breakpoints[breakpoint]}) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    flex-direction: column;
  }
`;
