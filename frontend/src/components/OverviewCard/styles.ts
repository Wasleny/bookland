import styled from "@emotion/styled";

export const StyledArticle = styled.article`
  border: ${({ theme }) =>
    `${theme.borders.thick} ${theme.colors.primarySoft}`};
`;

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primarySoft};
  padding: ${({ theme }) => theme.spacing.lg};

  h2 {
    margin: ${({ theme }) => theme.spacing.none};

    :last-of-type {
      color: ${({ theme }) => theme.colors.textOnInverted};
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      margin-top: ${({ theme }) => theme.spacing.lg};
    }

    svg {
      vertical-align: middle;
    }
  }
`;

export const StyledSection = styled.section`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};

  button,
  a {
    width: ${({ theme }) => theme.sizes.full};
    margin: ${({ theme }) => theme.spacing.none};
  }
`;
