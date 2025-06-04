import { StyledList } from "./styles";
import type { Spacing } from "../../types/common";

export interface ListProps {
  children: React.ReactNode;
  display?: "flex" | "block";
  justify?: "space-between";
  gap: Spacing;
}

const List = ({ children, display = "flex", gap = "md" }: ListProps) => {
  return (
    <StyledList display={display} gap={gap}>
      {children}
    </StyledList>
  );
};

export default List;
