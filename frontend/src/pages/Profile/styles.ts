import styled from "@emotion/styled";

export const StyledProfile = styled.section`
  width: ${({ theme }) => theme.sizes.full};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xxl};
  padding-right: ${({ theme }) => theme.spacing.xxl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;
    padding-right: ${({ theme }) => theme.spacing.none};
  }
`;

export const GeneralInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: ${({ theme }) => theme.sizes.elementXl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: ${({ theme }) => theme.sizes.full};
    align-items: center;
  }
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
  opacity: 65%;
`;

export const ProfileHeader = styled.header`
  display: flex;
  justify-content: space-between;

  button {
    margin: ${({ theme }) => theme.spacing.none};
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SpecificInfo = styled.div`
  width: ${({ theme }) => theme.sizes.full};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    text-align: center;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.sizes.md};
  margin: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.none}`};
`;

export const Dl = styled.dl`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
