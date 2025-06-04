import styled from "@emotion/styled";

interface StyledFooterProps {
  hasVerticalScroll: boolean
}

export const StyledFooter = styled.footer<StyledFooterProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnInverted};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme, hasVerticalScroll }) => hasVerticalScroll ? theme.spacing.xl : theme.spacing.auto};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
  text-align: center;

  & > section {
    width: ${({ theme }) => theme.sizes.full};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};

    & > * {
      margin: 0;
    }
  }

  nav ul {
    display: flex;
    list-style: none;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xxxxl};
    padding: ${({ theme }) => theme.spacing.none};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-family: ${({ theme }) => theme.fonts.base};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    nav ul {
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.xl};
    }
  }
`;
