import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import Typography from "../Typography";
import Card from "../Card";
import Button from "../Button";
import {
  Progress,
  ProgressBarContainer,
  Readings,
  StyledSection,
  UpdateProcessForm,
} from "./styles";
import mockReviews from "../../mocks/mockReviews";
import { useNavigate } from "react-router";
import Cover from "../Cover";
import Input from "../Form/Input";
import { ErrorMessage } from "../../pages/styles";
import type { ReviewProps } from "../../types/review";
import Modal from "../Modal";

const CurrentReadings = () => {
  const [userCurrentReadings, setUserCurrentReadings] = useState<ReviewProps[]>(
    []
  );
  const [newProgress, setNewProgress] = useState<string>("");
  const [idBook, setIdBook] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentReadings = () => {
      setUserCurrentReadings(
        mockReviews.filter(
          (reading) =>
            reading.user.id === currentUser?.id && reading.status === "reading"
        )
      );
    };

    getCurrentReadings();
  }, [currentUser]);

  const handleUpdate = (idBook: string, titleBook: string) => {
    setIdBook(idBook);
    setTitle(titleBook);
    setModalIsOpen(true);
    setError("");
  };

  const onUpdate = (e: FormEvent) => {
    e.preventDefault();

    try {
      const newReadingProgress = parseInt(newProgress);

      if (newReadingProgress > 100 || newReadingProgress < 0)
        throw new Error("O progresso precisa ser um número de 0 a 100.");

      setUserCurrentReadings(
        userCurrentReadings.map((reading) => {
          if (reading.book.id === idBook) {
            return { ...reading, progress: newReadingProgress };
          }

          return reading;
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha na atualização");
      return;
    }

    setTitle("");
    setIdBook("");
    setNewProgress("");
    setModalIsOpen(false);
  };

  return (
    <StyledSection>
      <Typography variant="h2">Leituras Atuais</Typography>
      <div>
        {userCurrentReadings.length > 0 ? (
          <>
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <UpdateProcessForm onSubmit={onUpdate}>
                <Typography variant="h2">{title}</Typography>
                <Input
                  id="update-progress"
                  label="Progresso"
                  onChange={(e) => setNewProgress(e.target.value)}
                  type="number"
                  value={newProgress}
                />
                <Button variant="submit" type="submit">
                  Atualizar
                </Button>
              </UpdateProcessForm>
            </Modal>

            <Readings>
              {userCurrentReadings.map((item) => (
                <article key={item.book.title} title={item.book.title}>
                  <Cover
                    onClick={() => navigate(`/book/${item.book.id}`)}
                    path={item.book.cover}
                    size="sm"
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
                  <Button
                    variant="edit"
                    onClick={() => handleUpdate(item.book.id, item.book.title)}
                  >
                    Atualizar Progresso
                  </Button>
                </article>
              ))}
            </Readings>
          </>
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
