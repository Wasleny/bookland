import { Link } from "react-router";
import { Brand, StyledHeader } from "../styles";
import brand from "../../../assets/brand.png";
import List from "../../List";
import Avatar from "../../Avatar";
import type { UserProps } from "../../../types/user";
import Dropdown from "../Dropdown";
import { useState } from "react";
import useIsSmallScreen from "../../../hooks/useIsSmallScreen";
import { RxHamburgerMenu } from "react-icons/rx";
import { bookMenu, managementMenu, userMenu } from "../../../constants/menu";
import { IoSearch } from "react-icons/io5";

interface AuthenticatedHeaderProps {
  currentUser: UserProps;
}

const AuthenticatedHeader = ({ currentUser }: AuthenticatedHeaderProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isMobile = useIsSmallScreen({ width: "768px" });

  const dropdownMobile = [
    { name: isMobile ? "Pesquisar" : <IoSearch />, to: "search" },
    ...bookMenu,
    ...(currentUser.role === "admin" ? managementMenu(isMobile) : []),
    ...userMenu,
  ];

  return (
    <StyledHeader>
      {isMobile ? (
        <nav>
          <Link to="/">
            <Brand src={brand} alt="Logo do Bookland" />
          </Link>
          <Dropdown
            id="hamburger"
            items={dropdownMobile}
            label={<RxHamburgerMenu size={40} />}
            openDropdown={openDropdown === "hamburger"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "hamburger" ? null : "hamburger")
            }
            setOpenDropdown={setOpenDropdown}
            position="right"
          />
        </nav>
      ) : (
        <nav>
          <div className="left">
            <Link to="/">
              <Brand src={brand} alt="Logo do Bookland" />
            </Link>
            <List gap="xxl">
              <Dropdown
                id="books"
                openDropdown={openDropdown === "books"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "books" ? null : "books")
                }
                setOpenDropdown={setOpenDropdown}
                label="Livros"
                items={bookMenu}
              />
            </List>
          </div>
          <div className="right">
            <List gap="xxl">
              <li><Link to='/search'><IoSearch /></Link></li>
              {currentUser.role === "admin" && (
                <Dropdown
                  position="right"
                  id="management"
                  openDropdown={openDropdown === "management"}
                  onToggle={() =>
                    setOpenDropdown(
                      openDropdown === "management" ? null : "management"
                    )
                  }
                  setOpenDropdown={setOpenDropdown}
                  label="Gestão"
                  items={managementMenu(false)}
                />
              )}

              <Dropdown
                position="right"
                id="user"
                openDropdown={openDropdown === "user"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "user" ? null : "user")
                }
                setOpenDropdown={setOpenDropdown}
                items={userMenu}
                label={<Avatar path={currentUser.avatarUrl} />}
              />
            </List>
          </div>
        </nav>
      )}
    </StyledHeader>
  );
};

export default AuthenticatedHeader;
