import styled from "@emotion/styled";

export const StyledSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.background};
  border: ${({ theme }) => theme.borders.none};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.xs};
  outline: none;
  min-width: ${({ theme }) => theme.sizes.elementLg};
  height: ${({ theme }) => theme.sizes.elementXs};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.base};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: ${({ theme }) => theme.sizes.full};
  }
`;
