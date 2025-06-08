import styled from "@emotion/styled";

export const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};

  div form div:last-of-type {
    display: flex;
    justify-content: end;
  }
`;