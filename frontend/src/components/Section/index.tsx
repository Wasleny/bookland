import type { ReactNode } from "react";
import { StyledSection } from "./styles";
import type { FlexDirection, Spacing } from "../../types/common";

interface SectionProps {
  children: ReactNode;
  flexDirection?: FlexDirection;
  gap?: Spacing;
}

const Section = ({
  children,
  flexDirection = "column",
  gap = "none",
}: SectionProps) => {
  return (
    <StyledSection flexDirection={flexDirection} gap={gap}>
      {children}
    </StyledSection>
  );
};

export default Section;
