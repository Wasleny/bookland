import styled from "@emotion/styled";
import type { Variant } from "../../types/common";
import { css } from "@emotion/react";

interface StyledTypographyProps {
  variant: Variant;
}

export const StyledTypography = styled.span<StyledTypographyProps>`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};

  ${({ variant, theme }) => {
    switch (variant) {
      case "h1":
        return css`
          font-family: ${theme.fonts.ui};
          font-weight: ${theme.fontWeights.bold};
          font-size: ${theme.fontSizes.xxl};
          margin: ${theme.spacing.none};
          margin-bottom: ${theme.spacing.xxl};
          text-transform: uppercase;
        `;

      case "title":
        return css`
          font-family: ${theme.fonts.reading};
          font-weight: ${theme.fontWeights.bold};
          font-size: ${theme.fontSizes.xxl};
          text-transform: capitalize;
        `;

      case "footerTitle":
        return css`
          font-size: ${theme.fontSizes.xl};
          text-transform: capitalize;
        `;

      case "body":
        return css`
          font-size: ${theme.fontSizes.base};
        `;

      case "credits":
        return css`
          font-size: ${theme.fontSizes.xs};
          text-transform: uppercase;
        `;

      case "ctaSecondary":
        return css`
          font-size: ${theme.fontSizes.sm};
          margin: ${theme.spacing.lg} ${theme.spacing.none} ${theme.spacing.xxl};
          text-align: left;

          a {
            font-weight: ${theme.fontWeights.bold};
            color: ${theme.colors.primary};
            text-decoration: underline;
            text-transform: uppercase;
          }
        `;
      case "h2":
        return css`
          font-family: ${theme.fonts.ui};
          font-weight: ${theme.fontWeights.bold};
          font-size: ${theme.fontSizes.xl};
          margin: ${theme.spacing.xl};
          text-transform: uppercase;
        `;

      case "searchTitle":
        return css`
          font-weight: ${theme.fontWeights.bold};
          font-size: ${theme.fontSizes.xl};
        `;

      case "h3":
        return css`
          font-family: ${theme.fonts.ui};
          font-weight: ${theme.fontWeights.medium};
          font-size: ${theme.fontSizes.base};
          margin-bottom: ${theme.spacing.md};
          text-transform: uppercase;
        `;

      case "cardTitle":
        return css`
          font-family: ${theme.fonts.ui};
          font-weight: ${theme.fontWeights.medium};
          font-size: ${theme.fontSizes.base};
          margin-bottom: ${theme.spacing.md};
        `;

      case "h4":
        return css`
          font-size: ${theme.fontSizes.sm};
          margin-bottom: ${theme.spacing.md};
        `;

      case "ctaTitle":
        return css`
          font-family: ${theme.fonts.ui};
          font-weight: ${theme.fontWeights.bold};
          font-size: ${theme.fontSizes.xl};
        `;

      case "legend":
        return css`
          font-size: ${theme.fontSizes.xs};
        `;

      case "link":
        return css`
          text-decoration: underline;
          color: ${theme.colors.accent};
          font-style: italic;
          font-weight: ${theme.fontWeights.bold};
          cursor: pointer;
        `;

      case "bodyItalic":
        return css`
          font-size: ${theme.fontSizes.base};
          font-style: italic;
        `;

      case "authorName":
        return css`
          font-size: ${theme.fontSizes.base};
          text-transform: uppercase;
        `;

      case "review":
        return css`
          font-size: ${theme.fontSizes.base};
          font-family: ${theme.fonts.reading};
        `;

      case "editionTitle":
        return css`
          font-size: ${theme.fontSizes.base};
          font-weight: ${theme.fontWeights.bold};
        `;

      case "avatarLegend":
        return css`
          opacity: 50%;
          font-size: ${theme.fontSizes.sm};
        `;

      default:
        break;
    }
  }}
`;
