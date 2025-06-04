import styled from "@emotion/styled";

export const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-top: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.xxl};

  h2 {
    margin: ${({ theme }) => theme.spacing.none};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    margin: ${({ theme }) => theme.spacing.xl};
  }
`;
