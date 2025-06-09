import styled from "@emotion/styled";

export const Actions = styled.div`
  display: flex;
  justify-content: end;
  gap: ${({ theme }) => theme.spacing.lg};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;
