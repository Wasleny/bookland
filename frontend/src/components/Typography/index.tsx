import type { Spacing, Variant } from "../../types/common";
import { StyledTypography } from "./styles";
import type { ReactNode } from "react";

const variantToElement = {
  h1: "h1",
  title: "h1",
  h2: "h2",
  footerTitle: "h2",
  ctaTitle: "h2",
  h3: "h3",
  cardTitle: "h3",
  h4: "h4",
  body: "p",
  credits: "p",
  ctaSecondary: "p",
  searchTitle: "h2",
  legend: "p",
  link: "a",
  bodyItalic: "p",
  authorName: "h2",
  review: "p",
  editionTitle: "h4",
  avatarLegend: "p",
} as const;

interface TypographyProps {
  children: ReactNode;
  variant: Variant;
  onClick?: () => void;
  marginStart?: Spacing;
  marginEnd?: Spacing;
  marginTop?: Spacing;
  marginBottom?: Spacing;
  dataTestId?: string;
}

const Typography = ({
  children,
  variant,
  onClick,
  marginBottom,
  marginEnd,
  marginStart,
  marginTop,
  dataTestId
}: TypographyProps) => {
  const Component = variantToElement[variant];

  return (
    <StyledTypography
      as={Component}
      variant={variant}
      onClick={onClick}
      marginBottom={marginBottom}
      marginEnd={marginEnd}
      marginStart={marginStart}
      marginTop={marginTop}
      data-testid={dataTestId}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography;
