import styled from "@emotion/styled";

export const CriteriaContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.p25};
  margin-top: ${({ theme }) => theme.spacing.xxxl};

  h4 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xxxl};
  }
`;

export const CriterionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledDl = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StyledDt = styled.dt`
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: ${({ theme }) => theme.fontSizes.base};

  svg {
    vertical-align: middle;
    margin-left: ${({ theme }) => theme.spacing.sm};
    color: ${({theme}) => theme.colors.secondary}
  }
`;

export const StyledDd = styled.dd`
  background-color: ${({ theme }) => theme.colors.primarySoft};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
`;
