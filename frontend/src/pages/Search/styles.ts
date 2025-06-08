import styled from "@emotion/styled";
import type { Breakpoint } from "../../types/common";
import Card from "../../components/Card";

export const StyledSection = styled.section`
  margin: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.none};

  h1 i {
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    text-transform: lowercase;
  }
`;

export const SearchResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

export const SearchCard = styled(Card)`
  flex: 0 1 auto;

  &:not(:only-child) {
    flex: 1 1 0;
  }
`;

export const CardHeader = styled.header<{ breakpoint: Breakpoint }>`
  display: flex;
  text-align: left;
  gap: ${({ theme }) => theme.spacing.md};

  > div {
    > a {
      margin-bottom: 1rem;
      display: block;
    }
  }

  @media screen and (max-width: ${({ theme, breakpoint }) => theme.breakpoints[breakpoint]}) {
    text-align: center;
    flex-direction: column;

    img {
      margin: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.auto}`};
      height: ${({ theme }) => theme.sizes.elementXxl};
      max-height: ${({ theme }) => theme.sizes.elementXxl};
      max-width: ${({ theme }) => theme.sizes.elementXxl};
    }

    > div > div {
      flex-direction: column;
    }
  }
`;

export const FooterCard = styled.footer<{ breakpoint: Breakpoint }>`
  button {
    width: 100%;

    @media screen and (max-width: ${({ theme, breakpoint }) => theme.breakpoints[breakpoint]}) {
      margin-top: ${({ theme }) => theme.spacing.lg};
    }
  }
`;
