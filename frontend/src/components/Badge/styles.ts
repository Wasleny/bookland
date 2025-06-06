import styled from "@emotion/styled";
import type { BadgeType } from "../../types/common";

export const StyledBadge = styled.span<{ type: BadgeType }>`
  border-radius: ${({ theme }) => theme.radii.xl};
  background-color: ${({ theme, type }) =>
    type === "genre" ? theme.colors.accent : theme.colors.secondary};
  color: ${({ theme, type }) =>
    type === "genre" ? theme.colors.textOnInverted : theme.colors.text};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.sm};
  text-transform: capitalize;
  font-weight: ${({theme}) => theme.fontWeights.light};
  white-space: nowrap;
`;
