import type { ReactNode } from "react";
import type {
  AlignItems,
  Breakpoint,
  FlexDirection,
  JustifyContent,
  Spacing,
  Width,
} from "../../types/common";
import { StyledCard } from "./styles";

interface CardProps {
  children: ReactNode;
  verticalPadding?: Spacing;
  horizontalPadding?: Spacing;
  breakpoint?: Breakpoint;
  flexDirection?: FlexDirection;
  width?: Width | null;
  gap?: Spacing | null;
  justifyContent?: JustifyContent | null;
  title?: string;
  alignItems?: AlignItems | null
}

const Card = ({
  children,
  verticalPadding = "md",
  horizontalPadding = "md",
  breakpoint = "md",
  flexDirection = "column",
  width = null,
  gap = null,
  justifyContent = null,
  title,
  alignItems = null
}: CardProps) => {
  return (
    <StyledCard
      breakpoint={breakpoint}
      verticalPadding={verticalPadding}
      horizontalPadding={horizontalPadding}
      flexDirection={flexDirection}
      width={width}
      gap={gap}
      justifyContent={justifyContent}
      title={title}
      alignItems={alignItems}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
