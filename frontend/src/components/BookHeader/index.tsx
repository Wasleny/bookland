import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { BookProps } from "../../types/book";
import type { ReviewProps } from "../../types/review";
import { useBooks } from "../../hooks/useBooks";
import { useAuth } from "../../hooks/useAuth";
import { StyledBookHeader } from "./styles";
import type { Status } from "../../types/common";
import Cover from "../Cover";
import Rating from "../Rating";
import Button from "../Button";
import Typography from "../Typography";
import BookModal from "../BookModal";

interface BookHeaderProps {
  book: BookProps;
}

const BookHeader = ({ book }: BookHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reading, setReading] = useState<ReviewProps | null>(null);
  const { reviews, getUserReading } = useBooks();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (book.id) {
      const userId = currentUser?.id;

      if (userId) setReading(getUserReading(userId, book.id) ?? null);
    }
  }, [book, currentUser, getUserReading]);

  const onUpdate = (bookshelf: Status) => {
    if (currentUser && book) {
      if (bookshelf === "not added") {
        setReading(null);
      } else {
        if (reading) {
          setReading({ ...reading, status: bookshelf, rating: undefined });
        } else {
          const newReading: ReviewProps = {
            id: `review-${reviews ? reviews.length + 1 : 1}`,
            user: currentUser,
            book: book,
            status: bookshelf,
            createdAt: new Date(),
          };
          setReading(newReading);
        }
      }

      setIsModalOpen(false);
    }
  };

  return (
    <StyledBookHeader>
      <div>
        <Cover
          path={book.cover}
          alt={`Capa do livro ${book.title}`}
          size="md"
        />
      </div>
      {reading?.rating ? (
        <Rating
          gap="md"
          size={45}
          averageRating={reading.rating ?? 0}
          flag="personal"
        />
      ) : (
        <Rating gap="md" size={45} rating={0} />
      )}

      {!reading ? (
        <Button variant="submit" onClick={() => setIsModalOpen(true)}>
          Adicionar à biblioteca
        </Button>
      ) : (
        <>
          {reading.status === "read" && (
            <Button
              variant="outline"
              color="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Lido
            </Button>
          )}{" "}
          {reading.status === "to read" && (
            <Button
              variant="outline"
              color="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Quero ler
            </Button>
          )}
          {reading.status === "reading" && (
            <Button
              variant="outline"
              color="accent"
              onClick={() => setIsModalOpen(true)}
            >
              Lendo
            </Button>
          )}
        </>
      )}

      {reading && (
        <Typography
          variant="link"
          onClick={() => navigate(`/rating-book/${book.id}`)}
        >
          Editar Avaliação
        </Typography>
      )}

      <BookModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={onUpdate}
      />
    </StyledBookHeader>
  );
};

export default BookHeader;
