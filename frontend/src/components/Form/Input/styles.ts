import styled from "@emotion/styled";
import type { InputType, Width } from "../../../types/common";
import { IoSearch } from "react-icons/io5";

interface InputWrapperProps {
  type: InputType;
  fieldWidth: Width;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  margin: ${({ theme }) => theme.spacing.none};
  margin-bottom: ${({ theme, type }) =>
    type === "search" ? theme.spacing.none : theme.spacing.lg};
  width: ${({ theme, fieldWidth }) => theme.sizes[fieldWidth]};
`;

interface StyledStyledInputProps {
  fieldWidth: Width;
  hasLabel: boolean;
}

export const StyledInput = styled.input<StyledStyledInputProps>`
  width: ${({ theme }) => theme.sizes.full};
  padding-left: ${({ theme, hasLabel }) =>
    hasLabel ? theme.spacing.ssm : theme.spacing.xxl};
  padding-right: ${({ theme, hasLabel }) =>
    hasLabel ? theme.spacing.ssm : theme.spacing.md};
  padding-bottom: ${({ theme, hasLabel }) =>
    hasLabel ? theme.spacing.ssm : theme.spacing.md};
  padding-top: ${({ theme, hasLabel }) =>
    hasLabel ? theme.spacing.lg : theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  border: ${({ theme }) => theme.borders.thin} transparent;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background};
  width: ${({ theme, fieldWidth }) => theme.sizes[fieldWidth]};

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.base};
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus + label,
  &[value]:not([value=""]) + label {
    top: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }

  &:focus {
    outline: none;
  }
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease-in-out;
  pointer-events: none;
  font-family: ${({ theme }) => theme.fonts.base};
`;

export const SearchIcon = styled(IoSearch)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.p25};
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ theme }) => theme.spacing.lg};
  height: ${({ theme }) => theme.spacing.lg};
`;
