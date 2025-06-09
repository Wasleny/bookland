import styled from "@emotion/styled";
import type { Spacing, Variant } from "../../types/common";
import { css } from "@emotion/react";

interface StyledTypographyProps {
  variant: Variant;
  marginStart?: Spacing;
  marginEnd?: Spacing;
  marginTop?: Spacing;
  marginBottom?: Spacing;
}

export const StyledTypography = styled.span<StyledTypographyProps>`
  font-family: ${({ theme }) => theme.fonts.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-top: ${({ marginTop, theme }) =>
    marginTop ? theme.spacing[marginTop] : theme.spacing.none};
  margin-left: ${({ marginStart, theme }) =>
    marginStart ? theme.spacing[marginStart] : theme.spacing.none};
  margin-right: ${({ marginEnd, theme }) =>
    marginEnd ? theme.spacing[marginEnd] : theme.spacing.none};
  margin-bottom: ${({ marginBottom, theme }) =>
    marginBottom ? theme.spacing[marginBottom] : theme.spacing.none};

  ${({ variant, theme, marginBottom, marginEnd, marginStart, marginTop }) => {
    switch (variant) {
      case "h1":
        return css`
          font-family: ${theme.fonts.ui};
          font-weight: ${theme.fontWeights.bold};
          font-size: ${theme.fontSizes.xxl};
          margin-bottom: ${marginBottom
            ? theme.spacing[marginBottom]
            : theme.spacing.xxl};
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
          margin-top: ${marginTop
            ? theme.spacing[marginTop]
            : theme.spacing.lg};
          margin-bottom: ${marginBottom
            ? theme.spacing[marginBottom]
            : theme.spacing.xxl};
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
          margin-top: ${marginTop
            ? theme.spacing[marginTop]
            : theme.spacing.xl};
          margin-left: ${marginStart
            ? theme.spacing[marginStart]
            : theme.spacing.xl};
          margin-right: ${marginEnd
            ? theme.spacing[marginEnd]
            : theme.spacing.xl};
          margin-bottom: ${marginBottom
            ? theme.spacing[marginBottom]
            : theme.spacing.xl};
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
          margin-bottom: ${marginBottom
            ? theme.spacing[marginBottom]
            : theme.spacing.md};
          text-transform: uppercase;
        `;

      case "cardTitle":
        return css`
          font-family: ${theme.fonts.ui};
          font-weight: ${theme.fontWeights.medium};
          font-size: ${theme.fontSizes.base};
          margin-bottom: ${marginBottom
            ? theme.spacing[marginBottom]
            : theme.spacing.md};
        `;

      case "h4":
        return css`
          font-size: ${theme.fontSizes.sm};
          margin-bottom: ${marginBottom
            ? theme.spacing[marginBottom]
            : theme.spacing.md};
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
          white-space: pre-line;
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
