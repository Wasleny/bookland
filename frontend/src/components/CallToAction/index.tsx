import { useNavigate } from "react-router";
import Button from "../Button";
import Typography from "../Typography";
import { StyledCallToAction } from "./styles";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <StyledCallToAction data-testid='call-to-action'>
      <Typography variant="ctaTitle">Junte-se à comunidade Bookland</Typography>
      <Button variant="ghost" onClick={() => navigate("/register")}>
        Criar Conta
      </Button>
    </StyledCallToAction>
  );
};

export default CallToAction;
