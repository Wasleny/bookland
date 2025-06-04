import useHasVerticalScroll from "../../hooks/useHasVerticalScroll";
import Typography from "../Typography";
import { StyledFooter } from "./styles";

const Footer = () => {
  const date = new Date();
  const hasVerticalScroll = useHasVerticalScroll();

  return (
    <StyledFooter hasVerticalScroll={hasVerticalScroll}>
      <section>
        <Typography variant="footerTitle">Bookland</Typography>
        <Typography variant="body">
          &copy; {date.getFullYear()}. Todos os direitos reservados.
        </Typography>
      </section>

      <nav>
        <ul>
          <li>Sobre o Projeto</li>
          <li>Termos de Uso</li>
          <li>Políticas de Privacidade</li>
          <li>Contato</li>
        </ul>
      </nav>

      <section>
        <Typography variant="credits">
          Desenvolvido por Wasleny Pimenta
        </Typography>
      </section>
    </StyledFooter>
  );
};

export default Footer;
