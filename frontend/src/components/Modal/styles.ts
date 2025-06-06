import styled from "@emotion/styled";

export const StyledModal = styled.dialog`
  background-color: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.none};
  padding: ${({ theme }) => theme.spacing.lg};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  header {
    text-align: end;

    svg {
      cursor: pointer;
    }
  }

  h2 {
    margin-top: ${({ theme }) => theme.spacing.none};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => theme.sizes.full};
  }
`;
