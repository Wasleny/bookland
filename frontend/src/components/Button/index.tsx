import type React from "react";
import type { BorderRadius, ButtonVariant, Colors } from "../../types/common";
import { StyledButton } from "./styles";

const variantToElement = {
  submit: "button",
  show: "a",
  edit: "button",
  search: "button",
  remove: "button",
  add: "button",
  ghost: "a",
  outline: "button",
} as const;

interface ButtonProps {
  children: React.ReactNode;
  variant: ButtonVariant;
  borderRadius?: BorderRadius;
  onClick?: () => void;
  type?: "submit" | 'button';
  color?: Colors;
}

const Button = ({
  children,
  borderRadius = "md",
  variant,
  onClick,
  type,
  color,
}: ButtonProps) => {
  const Component = variantToElement[variant];

  return (
    <StyledButton
      color={color}
      type={type}
      as={Component}
      bRadius={borderRadius}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
