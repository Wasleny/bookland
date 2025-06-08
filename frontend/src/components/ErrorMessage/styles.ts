import styled from "@emotion/styled";

export const StyledErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.alertSoft};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
`;