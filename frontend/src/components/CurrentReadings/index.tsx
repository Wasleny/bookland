import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { UserBookInteractionProps } from "../../types/userBookInteraction";
import Typography from "../Typography";
import Card from "../Card";
import Button from "../Button";
import {
  Progress,
  ProgressBarContainer,
  Readings,
  StyledSection,
} from "./styles";
import usersReadings from "../../mocks/mockUsersReadings";
import { useNavigate } from "react-router";
import Cover from "../Cover";

const CurrentReadings = () => {
  const [userCurrentReadings, setUserCurrentReadings] = useState<
    UserBookInteractionProps[]
  >([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentReadings = () => {
      setUserCurrentReadings(
        usersReadings.filter(
          (reading) =>
            reading.userId === currentUser?.id && reading.status === "reading"
        )
      );
    };

    getCurrentReadings();
  }, [currentUser]);

  return (
    <StyledSection>
      <Typography variant="h2">Leituras Atuais</Typography>
      <div>
        {userCurrentReadings.length > 0 ? (
          <Readings>
            {userCurrentReadings.map((item) => (
              <article key={item.book.title} title={item.book.title}>
                <Cover
                  onClick={() => navigate(`/book/${item.book.id}`)}
                  path={item.book.cover}
                  size='sm'
                  alt={`Capa do livro ${item.book.title}`}
                />
                <Typography variant="h3">{item.book.title}</Typography>
                <Typography variant="h4">{item.book.authors}</Typography>
                <div>
                  <ProgressBarContainer>
                    <Progress progress={item.progress ? item.progress : 0} />
                  </ProgressBarContainer>
                  <Typography variant="body">{item.progress}%</Typography>
                </div>
                <Button variant="edit">Atualizar Processo</Button>
              </article>
            ))}
          </Readings>
        ) : (
          <Card>
            <Typography variant="h3">
              Você ainda não começou nenhuma leitura.
            </Typography>
            <Typography variant="body">
              Que tal explorar o catálogo e encontrar seu próximo livro
              favorito?
            </Typography>
            <Typography variant="body">
              Comece sua jornada literária com a gente!
            </Typography>
            <Button variant="ghost">Explorar Catálogo</Button>
          </Card>
        )}
      </div>
    </StyledSection>
  );
};

export default CurrentReadings;
