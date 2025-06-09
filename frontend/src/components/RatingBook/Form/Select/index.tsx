import type { ChangeEvent } from "react";
import { StyledSelect } from "./styles";

interface SelectProps {
  items: { value: string | number; name: string | number }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ items, value, onChange }: SelectProps) => {
  return (
    <StyledSelect value={value} onChange={onChange}>
      <option></option>
      {items.map((item, index) => (
        <option key={index} value={item.value}>
          {item.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
