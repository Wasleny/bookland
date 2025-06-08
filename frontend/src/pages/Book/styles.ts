import styled from "@emotion/styled";

export const BookSection = styled.section`
  margin: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xxxl};
  }
`;