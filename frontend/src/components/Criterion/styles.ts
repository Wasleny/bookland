import styled from "@emotion/styled";

export const FooterCard = styled.footer`
  width: ${({ theme }) => theme.sizes.full};
  gap: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;

  button {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;

    button {
      width: ${({ theme }) => theme.sizes.full};
    }
  }
`;
