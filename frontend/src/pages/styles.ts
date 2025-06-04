import styled from "@emotion/styled";

export const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};

  div form div:last-of-type {
    display: flex;
    justify-content: end;
  }
`;

export const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.alertSoft};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
`;
