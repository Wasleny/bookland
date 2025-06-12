import styled from "@emotion/styled";

export const StyledShelves = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.xxxl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: ${({ theme }) => theme.borders.thin};
  gap: ${({ theme }) => theme.spacing.md};

  h3 {
    margin: ${({ theme }) => theme.spacing.none};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    font-size: ${({ theme }) => theme.fontSizes.md};
    text-decoration: underline;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;
