import styled from "@emotion/styled";

export const StyledSection = styled.section`
  margin: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.none};

  div {
    display: flex;
    justify-content: space-between;

    h1 {
      margin: ${({ theme }) => theme.spacing.none};
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.xl};
    }
  }
`;

export const StyledCriteria = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.none}`};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;
