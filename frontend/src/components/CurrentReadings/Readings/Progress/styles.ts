import styled from "@emotion/styled";

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${({ theme }) => theme.sizes.full};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ProgressTrack = styled.div`
  width: ${({ theme }) => theme.sizes.full};
  background-color: ${({ theme }) => theme.colors.background};
  height: ${({ theme }) => theme.sizes.elementXxs};
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: ${({ theme }) => theme.sizes.full};
  background-color: ${({ theme }) => theme.colors.accent};
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.3s ease-in-out;
`;
