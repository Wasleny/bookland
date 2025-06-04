import type React from "react";
import type { Variant } from "../../types/common";
import { StyledTypography } from "./styles";

const variantToElement = {
  h1: "h1",
  title: "h1",
  h2: "h2",
  footerTitle: "h2",
  ctaTitle: 'h2',
  h3: "h3",
  cardTitle: "h3",
  h4: "h4",
  body: "p",
  credits: 'p',
  ctaSecondary: 'p',
  searchTitle: 'h2',
  legend: 'p',
  link: 'p'
} as const;

interface TypographyProps {
  children: React.ReactNode;
  variant: Variant;
}

const Typography = ({ children, variant }: TypographyProps) => {
  const Component = variantToElement[variant];

  return (
    <StyledTypography as={Component} variant={variant}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
