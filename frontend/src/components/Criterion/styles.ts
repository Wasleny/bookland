import styled from "@emotion/styled";
import Card from "../Card";

export const CriterionCard = styled(Card)`
  && {
    gap: ${({ theme }) => theme.spacing.lg};
    display: flex;
    flex-direction: column;
    align-items: start;
  }

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

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;

      button {
        width: ${({ theme }) => theme.sizes.full};
      }
    }
  }
`;
