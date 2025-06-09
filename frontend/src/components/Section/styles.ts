import styled from "@emotion/styled";
import type { FlexDirection, Spacing } from "../../types/common";

interface StyledSectionProps {
  flexDirection: FlexDirection;
  gap: Spacing
}

export const StyledSection = styled.section<StyledSectionProps>`
  margin: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: ${({flexDirection}) => flexDirection};
  gap: ${({gap, theme}) => theme.spacing[gap]};
`;
