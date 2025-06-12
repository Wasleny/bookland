import styled from "@emotion/styled";

export const SectionMyShelves = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.xl};

  div {
    width: ${({ theme }) => theme.sizes.full};
    height: ${({ theme }) => theme.sizes.full};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 2fr;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const List = styled.ul`
  list-style: none;
  width: ${({ theme }) => theme.sizes.full};
  text-align: start;
  display: flex;
  flex-direction: column;
`;

export const ItemList = styled.li`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => theme.spacing.lg};
  text-transform: uppercase;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.primarySoft};
  }
`;

export const Books = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl};

  h1 {
    display: block;
    width: ${({ theme }) => theme.sizes.full};
    margin: ${({ theme }) => theme.spacing.none};
  }
`;
