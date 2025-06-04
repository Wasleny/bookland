import styled from "@emotion/styled";

export const FeaturedBookGenre = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  align-items: center;
  text-align: center;

  & > h3:last-of-type {
    margin: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.none}`};
  }
`;