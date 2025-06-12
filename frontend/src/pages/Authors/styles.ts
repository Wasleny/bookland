import styled from "@emotion/styled";

export const Table = styled.table`
  width: ${({ theme }) => theme.sizes.full};
  border-collapse: collapse;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.base};

  th,
  td {
    border: ${({ theme }) =>
      `${theme.borders.thin} ${theme.colors.primarySoft}`};
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textOnInverted};
    text-transform: uppercase;
  }

  tr:hover {
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }
`;

export const Actions = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  svg {
    cursor: pointer;

    :first-of-type {
      color: ${({ theme }) => theme.colors.secondary};
    }

    :last-of-type {
      color: ${({ theme }) => theme.colors.alert};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
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
