import styled from "@emotion/styled";

export const StyledSection = styled.section`
  margin: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.none};
  display: flex;
  flex-wrap: wrap;

  h1,
  hr {
    display: block;
    width: ${({ theme }) => theme.sizes.full};
  }
`;

export const Users = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl};
  width: ${({ theme }) => theme.sizes.full};
`;

export const UserHeader = styled.header`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  div {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;

export const UserFooter = styled.footer`
  button {
    padding: ${({ theme }) => theme.spacing.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;
