import styled from "@emotion/styled";

export const StyledBanner = styled.section`
  background-color: ${({ theme }) => theme.colors.primarySoft};
  padding: ${({ theme }) => theme.spacing.xxxxl};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;
