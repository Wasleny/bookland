import styled from "@emotion/styled";

export const StyledForm = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  align-items: end;

  > div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.xl};
    width: ${({ theme }) => theme.sizes.full};
    margin-top: ${({ theme }) => theme.spacing.lg};
    justify-content: end;

    button {
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
