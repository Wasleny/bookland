import styled from "@emotion/styled";

export const InformationSection = styled.section`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.sizes.full};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Edition = styled.section`
  margin-top: ${({ theme }) => theme.spacing.lg};
  opacity: 75%;

  dl div {
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;
