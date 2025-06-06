import type { BadgeType } from "../../types/common";
import { StyledBadge } from "./styles";

interface BadgeProps {
  type: BadgeType;
  children: string;
}

const Badge = ({ type, children }: BadgeProps) => {
  return <StyledBadge type={type}>{children}</StyledBadge>;
};

export default Badge;
