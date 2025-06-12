import styled from "@emotion/styled";

export const StyledSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.background};
  border: ${({ theme }) => theme.borders.none};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.ssm}`};
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.base};
  width: ${({ theme }) => theme.sizes.full};

  :not([multiple]) {
    height: ${({ theme }) => theme.sizes.elementSm};
    padding: ${({ theme }) => `${theme.spacing.none} ${theme.spacing.ssm}`};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  input,
  div {
    margin: ${({ theme }) => theme.spacing.none};
  }

  input[type="date"] {
    height: ${({ theme }) => theme.sizes.elementMd};
  }

  textarea {
    background-color: ${({ theme }) => theme.colors.background};
    border: ${({ theme }) => theme.borders.none};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.ssm}`};
    outline: none;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-family: ${({ theme }) => theme.fonts.base};
    width: ${({ theme }) => theme.sizes.full};
  }
`;
