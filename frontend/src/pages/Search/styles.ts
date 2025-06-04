import styled from "@emotion/styled";
import type { Breakpoint } from "../../types/common";

export const StyledSection = styled.section`
  margin: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.none};

  h1 i {
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    text-transform: lowercase;
  }
`;

export const SearchResults = styled.div<{ breakpoint: Breakpoint }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xxl};

  > div {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};

    .card-head {
      display: flex;
      text-align: left;
      gap: ${({ theme }) => theme.spacing.md};

      > div {
        > p {
          margin-bottom: 1rem;
        }
      }
    }

    button {
      width: 100%;
    }

    @media screen and (max-width: ${({ theme, breakpoint }) => theme.breakpoints[breakpoint]}) {
      .card-head {
        flex-direction: column;
        text-align: center;

        img {
          margin: ${({ theme }) =>
            `${theme.spacing.none} ${theme.spacing.auto}`};
          height: ${({ theme }) => theme.sizes.elementXxl};
          max-height: ${({ theme }) => theme.sizes.elementXxl};
          max-width: ${({ theme }) => theme.sizes.elementXxl};
        }

        > div > div {
          flex-direction: column;
        }
      }

      button {
        margin-top: ${({ theme }) => theme.spacing.lg};
      }
    }
  }
`;
