import styled from "@emotion/styled";

export const StyledCallToAction = styled.section`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textOnInverted};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;
