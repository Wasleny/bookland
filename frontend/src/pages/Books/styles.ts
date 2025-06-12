import styled from "@emotion/styled";

export const List = styled.ul`
  list-style: none;
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.xl};

  h1,
  button {
    margin: ${({ theme }) => theme.spacing.none};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Row = styled.div`
  display: flex;
  width: fit-content;
  margin: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.none}`};
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Dl = styled.dl`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;
