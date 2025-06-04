import styled from "@emotion/styled";

export const StyledAside = styled.aside`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};

  h2 {
    color: ${({ theme }) => theme.colors.primary};
  }

  ul {
    padding: ${({ theme }) => theme.spacing.none};
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};

    li a {
      font-family: ${({ theme }) => theme.fonts.ui};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      color: ${({ theme }) => theme.colors.text};
      text-decoration: none;

      :hover {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;