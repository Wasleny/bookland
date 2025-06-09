import styled from "@emotion/styled";

export const UpdateProgressForm = styled.form`
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: end;

  h2 {
    margin-right: ${({ theme }) => theme.spacing.auto};
  }
`;