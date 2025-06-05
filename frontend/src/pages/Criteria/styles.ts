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

  div {
    gap: ${({ theme }) => theme.spacing.lg};
    display: flex;
    flex-direction: column;
    align-items: start;

    h2 {
      margin: ${({ theme }) => theme.spacing.none};
    }

    footer {
      width: ${({ theme }) => theme.sizes.full};
      gap: ${({ theme }) => theme.spacing.lg};
      display: flex;
      justify-content: space-between;

      button {
        margin-top: ${({ theme }) => theme.spacing.none};
        padding: ${({ theme }) => theme.spacing.md};
        font-weight: ${({ theme }) => theme.fontWeights.semibold};
        font-size: ${({ theme }) => theme.fontSizes.base};
        width: fit-content;
      }
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    div footer {
      flex-direction: column;

      button {
        width: ${({ theme }) => theme.sizes.full};
      }
    }
  }
`;

export const StyledForm = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: end;

  > div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.xl};
    width: ${({ theme }) => theme.sizes.full};
    margin-top: ${({ theme }) => theme.spacing.lg};
    justify-content: end;

    button {
      width: fit-content;
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;

      button {
        width: ${({ theme }) => theme.sizes.full};
      }
    }
  }
`;
