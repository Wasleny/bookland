import styled from "@emotion/styled";

export const StyledSection = styled.section`
  > div {
    margin-right: ${({ theme }) => theme.spacing.xl};

    > div {
      width: ${({ theme }) => theme.sizes.full};
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.lg};
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      margin-right: ${({ theme }) => theme.spacing.none};
    }
  }
`;

export const Readings = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};

  > article {
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.xl};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    width: fit-content;

    > h3,
    > h4 {
      margin: ${({ theme }) => theme.spacing.none};
    }

    > h3 {
      width: 100%;
      max-width: ${({ theme }) => theme.sizes.elementXxl};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      display: block;
    }

    > div {
      display: flex;
      align-items: center;
      width: ${({ theme }) => theme.sizes.full};
      gap: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

export const ProgressBarContainer = styled.div`
  width: ${({ theme }) => theme.sizes.full};
  background-color: ${({ theme }) => theme.colors.background};
  height: ${({ theme }) => theme.sizes.elementXxs};
`;

export const Progress = styled.div<{ progress: number }>`
  height: ${({ theme }) => theme.sizes.full};
  background-color: ${({ theme }) => theme.colors.accent};
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.3s ease-in-out;
`;

export const UpdateProcessForm = styled.form`
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: end;

  h2 {
    margin-right: ${({ theme }) => theme.spacing.auto};
  }
`;
