import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Card from "../../components/Card";
import Typography from "../../components/Typography";
import { ErrorMessage, StyledMain } from "../styles";
import Input from "../../components/Form/Input";
import Button from "../../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!email || !password) throw new Error("Preencha todos os campos para logar.");

      setIsLoading(true);
      setError("");

      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledMain>
      <Card verticalPadding="lg" horizontalPadding="xl">
        <Typography variant="h1">ENTRAR</Typography>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            label="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />

          <Input
            id="password"
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />

          <Typography variant="ctaSecondary">
            Ainda não possui cadastro? <Link to="/register">Clique aqui.</Link>
          </Typography>

          <div>
            <Button borderRadius="md" variant="submit">
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </Card>
    </StyledMain>
  );
};

export default Login;
