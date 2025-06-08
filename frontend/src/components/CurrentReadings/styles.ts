import styled from "@emotion/styled";

export const StyledSection = styled.section`
  > div {
    margin-right: ${({ theme }) => theme.spacing.xl};

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      margin-right: ${({ theme }) => theme.spacing.none};
    }
  }
`;