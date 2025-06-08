import styled from "@emotion/styled";

export const StyledBookHeader = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  > div:first-of-type {
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.xl};
  }

  button {
    width: ${({ theme }) => theme.sizes.full};
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};

    p {
      text-align: center;
      cursor: pointer;
    }
  }
`;