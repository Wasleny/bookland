import type React from "react";
import type { BorderRadius, ButtonVariant } from "../../types/common";
import { StyledButton } from "./styles";

const variantToElement = {
  submit: "button",
  show: "a",
  edit: "button",
  search: "button",
  remove: "button",
  add: "button",
  ghost: "a",
} as const;

interface ButtonProps {
  children: React.ReactNode;
  variant: ButtonVariant;
  borderRadius?: BorderRadius;
  onClick?: () => void;
  type?: 'submit'
}

const Button = ({ children, borderRadius = "md", variant, onClick, type }: ButtonProps) => {
  const Component = variantToElement[variant];

  return (
    <StyledButton type={type} as={Component} bRadius={borderRadius} variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
