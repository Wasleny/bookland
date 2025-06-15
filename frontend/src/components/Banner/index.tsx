import { useAuth } from "../../hooks/useAuth";
import Button from "../Button";
import Typography from "../Typography";
import { StyledBanner } from "./styles";

const Banner = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <StyledBanner data-testid="banner">
      <Typography variant="title">Olá, {currentUser?.name}</Typography>
      <Typography variant="body">
        Bem-vinda de volta ao Bookland. Continue sua jornada literária onde
        parou.
      </Typography>
    </StyledBanner>
  ) : (
    <StyledBanner data-testid="banner">
      <Typography variant="title">
        DESCUBRA, LEIA E COMPARTILHE LIVROS
      </Typography>
      <Typography variant="body">
        O Bookland é sua comunidade literária online.
        <br />
        Descubra novos títulos, acompanhe suas leituras e compartilhe resenhas
        com amigos.
      </Typography>
      <Button variant="ghost">Explorar Catálogo</Button>
    </StyledBanner>
  );
};

export default Banner;
