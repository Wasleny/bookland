import styled from "@emotion/styled";

export const FooterCard = styled.footer`
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
`;
