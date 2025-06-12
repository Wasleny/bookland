import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import Typography from "../Typography";
import Card from "../Card";
import Button from "../Button";
import { StyledSection } from "./styles";
import ModalUpdateProgress from "./ModalUpdateProgress";
import Readings from "./Readings";
import { useBooks } from "../../hooks/useBooks";
import type { ReadingInProgressProps } from "../../types/readingInProgress";

const CurrentReadings = () => {
  const [newProgress, setNewProgress] = useState<string>("");
  const [idBook, setIdBook] = useState<string>();
  const [userAllReadingsInProgress, setUserAllReadingsInProgress] =
    useState<ReadingInProgressProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { getUserAllReadingsInProgress } = useBooks();

  useEffect(() => {
    if (!currentUser) return;

    const readings = getUserAllReadingsInProgress(currentUser.id);

    if (!readings) return;

    setUserAllReadingsInProgress(readings);
  }, [currentUser, getUserAllReadingsInProgress]);

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

      setUserAllReadingsInProgress(
        userAllReadingsInProgress.map((reading) => {
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
        {userAllReadingsInProgress.length > 0 ? (
          <>
            <ModalUpdateProgress
              error={error}
              modalIsOpen={modalIsOpen}
              newProgress={newProgress}
              onClose={() => setModalIsOpen(false)}
              onUpdate={onUpdate}
              setNewProgress={setNewProgress}
              title={title}
            />

            <Readings
              handleUpdate={handleUpdate}
              userAllReadingsInProgress={userAllReadingsInProgress}
            />
          </>
        ) : (
          <Card width="full" gap="lg">
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
