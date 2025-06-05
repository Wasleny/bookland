import styled from "@emotion/styled";

export const StyledSection = styled.section`
  margin: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.none};
  display: flex;
  flex-wrap: wrap;

  h1,
  hr {
    display: block;
    width: ${({ theme }) => theme.sizes.full};
  }

  .users {
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xl};
    width: ${({ theme }) => theme.sizes.full};

    div {
      display: flex;
      justify-content: space-between;

      header {
        display: flex;
        gap: ${({ theme }) => theme.spacing.md};

        div {
          display: flex;
          flex-direction: column;
        }
      }

      footer button {
        padding: ${({ theme }) => theme.spacing.sm};
        font-weight: ${({ theme }) => theme.fontWeights.semibold};
      }
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      > div {
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.lg};

        header {
          text-align: left;
        }
      }
    }
  }
`;
