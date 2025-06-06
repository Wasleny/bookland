import styled from "@emotion/styled";
import type { Spacing } from "../../types/common";

export const StyledRating = styled.div<{ strokeWidth: number, gap: Spacing }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  > div {
    display: flex;
    flex-direction: row;
    gap: ${({ theme, gap }) => theme.spacing[gap]};
    
  }

  .filled-star,
  .outline-star {
    color: ${({ theme }) => theme.colors.secondary};
    stroke: ${({ theme }) => theme.colors.secondary};
    stroke-width: ${({ strokeWidth }) => strokeWidth};
  }

  .outline-star {
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const PartialStar = styled.div<{
  size: number;
  notFilledPercentage: number;
  strokeWidth: number;
}>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  * {
    box-sizing: border-box;
  }

  .base-masked-star,
  .masked-overlay-star {
    vertical-align: middle;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
  }

  .base-masked-star {
    color: ${({ theme }) => theme.colors.background};
    stroke: ${({ theme }) => theme.colors.secondary};
    stroke-width: ${({ strokeWidth }) => strokeWidth};
  }

  .masked-overlay-star {
    clip-path: inset(
      0 ${({ notFilledPercentage }) => 100 - notFilledPercentage}% 0 0
    );
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
