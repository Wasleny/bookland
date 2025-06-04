import type React from "react";
import { StyledDropdown } from "./styles";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

interface DropdownProps {
  label: string | React.ReactNode;
  items: { name: string | React.ReactNode; to: string }[];
  position?: "right" | "left";
  id: string;
  openDropdown: boolean;
  onToggle: () => void;
  setOpenDropdown: (id: string | null) => void;
}

const Dropdown = ({
  label,
  items,
  position = "left",
  openDropdown,
  onToggle,
  setOpenDropdown,
}: DropdownProps) => {
  const { logout } = useAuth();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, setOpenDropdown]);

  return (
    <StyledDropdown position={position} openDropdown={openDropdown} ref={dropdownRef}> 
      <button onClick={onToggle}>{label}</button>

      {openDropdown && (
        <ul className="dropdown-menu">
          {items.map((item, index) =>
            item.name === "Sair" ? (
              <li key={index} onClick={logout}>
                {item.name}
              </li>
            ) : (
              <li key={index} onClick={()=> navigate(item.to)}>{item.name}</li>
            )
          )}
        </ul>
      )}
    </StyledDropdown>
  );
};

export default Dropdown;
