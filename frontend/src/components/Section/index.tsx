import type { ReactNode } from "react";
import { StyledSection } from "./styles";

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <StyledSection>{children}</StyledSection>;
};

export default Section;
