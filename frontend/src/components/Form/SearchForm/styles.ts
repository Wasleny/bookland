import styled from "@emotion/styled";

export const StyledSearchGroup = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xl};
  
  form {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};

    @media screen and (max-width: ${({theme}) => theme.breakpoints.md}) {
      flex-direction: column;

      button {
        width: ${({theme}) => theme.sizes.full};
        margin-top: ${({ theme }) => theme.spacing.lg};
      }
    }
  }
`;
