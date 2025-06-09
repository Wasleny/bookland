import styled from "@emotion/styled";
import type { Spacing } from "../../types/common";

export const Badges = styled.div<{ marginTop: Spacing }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme, marginTop }) => marginTop ? theme.spacing[marginTop] : theme.spacing.none};
`;
