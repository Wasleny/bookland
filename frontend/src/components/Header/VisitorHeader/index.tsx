import { Brand, StyledHeader } from "../styles";
import brand from "../../../assets/brand.png";
import List from "../../List";
import { Link } from "react-router";
import useIsSmallScreen from "../../../hooks/useIsSmallScreen";
import Dropdown from "../Dropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";


const VisitorHeader = () => {
  const isMobile = useIsSmallScreen({ width: "768px" });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const menuList = [
    { name: isMobile ? "Pesquisar" : <IoSearch />, to: "search" },
    { name: "Entrar", to: "login" },
    { name: "Cadastrar", to: "register" },
  ];

  return (
    <StyledHeader>
      <nav>
        <Link to="/">
          <Brand src={brand} alt="Logo do Bookland" />
        </Link>
        {isMobile ? (
          <Dropdown
            id="hamburger"
            items={menuList}
            label={<RxHamburgerMenu size={40} />}
            openDropdown={openDropdown === "hamburger"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "hamburger" ? null : "hamburger")
            }
            setOpenDropdown={setOpenDropdown}
            position="right"
          />
        ) : (
          <List gap="xxl">
            {menuList.map((item, index) => (
              <li key={index}>
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}
          </List>
        )}
      </nav>
    </StyledHeader>
  );
};

export default VisitorHeader;
