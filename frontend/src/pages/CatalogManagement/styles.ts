import styled from "@emotion/styled";

export const StyledMain = styled.main`
  margin: ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-direction: row;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: auto;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: end;
  gap: ${({ theme }) => theme.spacing.lg};
`;
