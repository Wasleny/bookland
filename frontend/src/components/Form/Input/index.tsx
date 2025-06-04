import type React from "react";
import { InputWrapper, SearchIcon, StyledInput, StyledLabel } from "./styles";
import type { InputType, Width } from "../../../types/common";

interface InputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  width?: Width;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: InputType;
}

const Input = ({
  id,
  label = "",
  value,
  width = "full",
  onChange,
  placeholder,
  type = "text",
}: InputProps) => {
  return (
    <InputWrapper fieldWidth={width} type={type}>
      <StyledInput
        fieldWidth={width}
        hasLabel={label.length > 0}
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
        type={type}
        placeholder={placeholder}
      />
      {type === "search" ? (
        <SearchIcon />
      ) : (
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
      )}
    </InputWrapper>
  );
};

export default Input;
