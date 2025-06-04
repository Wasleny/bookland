import type React from "react";
import type { Breakpoint, Spacing } from "../../types/common";
import { StyledCard } from "./styles";

interface CardProps {
  children: React.ReactNode;
  verticalPadding?: Spacing;
  horizontalPadding?: Spacing;
  breakpoint?: Breakpoint
}

const Card = ({
  children,
  verticalPadding = "md",
  horizontalPadding = "md",
  breakpoint = 'md'
}: CardProps) => {
  return (
    <StyledCard breakpoint={breakpoint}
      verticalPadding={verticalPadding}
      horizontalPadding={horizontalPadding}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
