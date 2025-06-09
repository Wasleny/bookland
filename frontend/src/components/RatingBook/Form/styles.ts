import styled from "@emotion/styled";

export const Row = styled.div<{ flexColumn?: boolean }>`
  display: flex;
  width: ${({ theme }) => theme.sizes.full};
  gap: ${({ theme }) => theme.spacing.lg};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: ${({ flexColumn }) => (flexColumn ? "column" : "")};
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.sizes.full};
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: start;
  text-align: start;
`;

export const GroupForm = styled.div<{ flexColumn?: boolean }>`
  display: flex;
  width: ${({ theme }) => theme.sizes.full};
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: ${({ theme }) => theme.sizes.full};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: ${({ flexColumn }) => (flexColumn ? "column" : "")};
    align-items: start;
  }
`;

export const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const StyledTextarea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.background};
  border: ${({ theme }) => theme.borders.none};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.xs};
  outline: none;
  width: ${({ theme }) => theme.sizes.full};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.base};
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const StyledDiv = styled.div`
  text-align: start;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: end;
  gap: ${({ theme }) => theme.spacing.lg};

  button {
    margin: ${({ theme }) => theme.spacing.none};
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;
