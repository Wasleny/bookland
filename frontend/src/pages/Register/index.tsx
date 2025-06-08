import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Card from "../../components/Card";
import Typography from "../../components/Typography";
import { StyledMain } from "../styles";
import Input from "../../components/Form/Input";
import Button from "../../components/Button";
import { normalizeText } from "../../utils/normalizeText";
import ErrorMessage from "../../components/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!email || !password || !name)
        throw new Error("Preencha todos os campos para logar.");

      if (password !== confirmPassword)
        throw new Error(
          "As senhas não coincidem. Verifique e tente novamente.."
        );

      setIsLoading(true);
      setError("");

      setNickname(normalizeText(name, { replaceSpacesWith: "_" }));

      await register(email, name, nickname, password);
      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Falha no login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledMain>
      <Card verticalPadding="lg" horizontalPadding="xl" width='lg'>
        <Typography variant="h1">Cadastrar</Typography>

        <ErrorMessage error={error} />

        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
          />

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

          <Input
            id="confirm_password"
            label="Confirmar Senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            value={confirmPassword}
          />

          <Typography variant="ctaSecondary">
            Já possui cadastro? <Link to="/login">Clique aqui.</Link>
          </Typography>

          <div>
            <Button borderRadius="md" variant="submit">
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Card>
    </StyledMain>
  );
};

export default Register;
