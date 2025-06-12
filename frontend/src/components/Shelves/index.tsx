import { Link } from "react-router";
import Typography from "../Typography";
import { StyledShelves } from "./styles";

const Shelves = () => {
  return (
    <StyledShelves>
      <Typography variant="h3">Estantes</Typography>
      <Link to="/my-shelves">Lidos</Link>
      <Link to={`/my-shelves/${encodeURIComponent("want to read")}`}>
        Quero ler
      </Link>
      <Link to="/my-shelves/reading">Lendo</Link>
    </StyledShelves>
  );
};

export default Shelves