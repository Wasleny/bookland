import { Link } from "react-router";
import Typography from "../Typography";
import { StyledAside } from "./styles";
import { bookMenu, managementMenu, userMenu } from "../../constants/menu";
import { useAuth } from "../../hooks/useAuth";

const AsideMenu = () => {
  const { currentUser } = useAuth();
  const asideMenu = [
    ...bookMenu,
    ...(currentUser?.role === "admin" ? managementMenu(true) : []),
    ...userMenu,
  ];

  return (
    <StyledAside>
      <Typography variant="h2">Acesso Rápido</Typography>
      <ul>
        {asideMenu.map((menu) => (
          <li key={menu.name}>
            <Link to={menu.to}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    </StyledAside>
  );
};

export default AsideMenu;
