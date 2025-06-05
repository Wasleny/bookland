import styled from "@emotion/styled";
import type { BorderRadius, ButtonVariant } from "../../types/common";
import { css } from "@emotion/react";

interface StyledButtonProps {
  variant: ButtonVariant;
  bRadius: BorderRadius;
}

export const StyledButton = styled.button<StyledButtonProps>`
  font-family: ${({ theme }) => theme.fonts.ui};
  border-radius: ${({ theme, bRadius }) => theme.radii[bRadius]};
  border: ${({ theme }) => theme.borders.thick} transparent;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textOnInverted};
  padding: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;

  :hover {
    transition: all 0.3s ease-in-out;
  }

  @media screen and (max-width: 768px) {
    width: ${({ theme }) => theme.sizes.full};
  }

  ${({ variant, theme }) => {
    switch (variant) {
      case "submit":
        return css`
          background-color: ${theme.colors.primary};
          font-weight: ${theme.fontWeights.bold};
          padding: ${theme.spacing.ssm} ${theme.spacing.xl};

          :hover {
            background-color: ${theme.colors.surface};
            color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
          }
        `;

      case "ghost":
        return css`
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          font-weight: ${theme.fontWeights.medium};
          text-transform: capitalize;
          margin: ${theme.spacing.none} ${theme.spacing.auto};
          border: ${theme.borders.thin} transparent;
          width: fit-content;

          :hover {
            background-color: ${theme.colors.backgroundInverted};
            color: ${theme.colors.textOnInverted};
            transition: all 0.3s ease-in-out;
          }
        `;

      case "show":
        return css`
          background-color: ${theme.colors.backgroundInverted};
          font-weight: ${theme.fontWeights.semibold};
          font-size: ${theme.fontSizes.sm};
          margin: ${theme.spacing.md} ${theme.spacing.auto}
            ${theme.spacing.none};
          width: ${theme.sizes.p80};

          :hover {
            background-color: ${theme.colors.surface};
            border-color: ${theme.colors.backgroundInverted};
            color: ${theme.colors.text};
          }
        `;

      case "edit":
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.text};
          font-weight: ${theme.fontWeights.semibold};
          font-size: ${theme.fontSizes.sm};
          margin-top: ${theme.spacing.lg};
          width: ${theme.sizes.full};

          :hover {
            background-color: ${theme.colors.surface};
            border-color: ${theme.colors.secondary};
          }
        `;

      case "search":
        return css`
          background-color: ${theme.colors.accent};
          color: ${theme.colors.textOnInverted};
          font-weight: ${theme.fontWeights.semibold};
          font-size: ${theme.fontSizes.sm};
          width: fit-content;

          :hover {
            background-color: ${theme.colors.surface};
            border-color: ${theme.colors.accent};
            color: ${theme.colors.accent};
          }
        `;

      case "remove":
        return css`
          background-color: ${theme.colors.alert};
          color: ${theme.colors.textOnInverted};
          font-weight: ${theme.fontWeights.bold};
          padding: ${theme.spacing.ssm} ${theme.spacing.xl};

          :hover {
            background-color: ${theme.colors.surface};
            border-color: ${theme.colors.alert};
            color: ${theme.colors.alert};
          }
        `;

      default:
        break;
    }
  }};
`;
