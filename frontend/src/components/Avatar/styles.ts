import styled from "@emotion/styled";
import type { Width } from "../../types/common";

export const StyledAvatar = styled.img<{size: Width}>`
  width: ${({ theme, size }) => theme.sizes[size]};
`;
