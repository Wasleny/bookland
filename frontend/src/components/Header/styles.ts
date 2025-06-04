import styled from "@emotion/styled";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.backgroundInverted};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    li > a,
    label {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.textOnInverted};
      font-family: ${({ theme }) => theme.fonts.ui};
      font-size: ${({ theme }) => theme.fontSizes.lg};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      cursor: pointer;

      :hover {
        color: ${({ theme }) => theme.colors.secondary};
        transition: color 0.3s ease-in-out;
      }
    }

    .left {
      display: flex;
      justify-content: start;
      gap: ${({ theme }) => theme.spacing.xl};
    }

    .center {
      display: flex;
      justify-content: center;
    }

    .right {
      display: flex;
      justify-content: end;
    }
  }
`;

export const Brand = styled.img`
  height: ${({ theme }) => theme.sizes.elementSm};
`;
