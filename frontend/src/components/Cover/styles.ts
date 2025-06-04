import styled from "@emotion/styled";
import type { Width } from "../../types/common";

interface StyledCoverProps {
    size: Width;
}

export const StyledCover = styled.img<StyledCoverProps>`
  height: ${({ theme, size }) => theme.sizes[size]};
  max-height: ${({ theme, size }) => theme.sizes[size]};
  max-width: ${({ theme, size }) => theme.sizes[size]};
  width: auto;
  object-fit: contain;
  cursor: pointer;
`;
