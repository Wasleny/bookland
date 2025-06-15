import type { MouseEvent, ReactNode } from "react";
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
  children: ReactNode;
  variant: ButtonVariant;
  borderRadius?: BorderRadius;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | 'button';
  color?: Colors;
  dataTestId?: string;
}

const Button = ({
  children,
  borderRadius = "md",
  variant,
  onClick,
  type,
  color,
  dataTestId
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
      data-testid={dataTestId}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
