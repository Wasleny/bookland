import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { BookProps } from "../../types/book";
import { useBooks } from "../../hooks/useBooks";
import { useAuth } from "../../hooks/useAuth";
import { StyledBookHeader } from "./styles";
import Cover from "../Cover";
import Rating from "../Rating";
import Button from "../Button";
import Typography from "../Typography";
import BookModal from "../BookModal";
import type { BookUserProps } from "../../types/bookUser";
import type { Bookshelf } from "../../types/common";
import type { ReviewProps } from "../../types/review";

interface BookHeaderProps {
  book: BookProps;
}

const BookHeader = ({ book }: BookHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reading, setReading] = useState<BookUserProps | null>(null);
  const { getUserBookshelfEntry, getMostRecentReading } = useBooks();
  const [mostRecentReading, setMostRecentReading] = useState<ReviewProps>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!book) return;
    if (!currentUser) {
      setReading(null);
      setMostRecentReading(undefined);
      return;
    }

    const bookReading = getUserBookshelfEntry(book.id, currentUser.id);
    if (!bookReading) return;

    setReading(bookReading);

    const mostRecent = getMostRecentReading(book.id, currentUser.id);
    if (!mostRecent) return;

    setMostRecentReading(mostRecent);
  }, [book, currentUser, getUserBookshelfEntry, getMostRecentReading]);

  const onUpdate = (bookshelf: Bookshelf) => {
    if (currentUser && book) {
      if (reading) {
        setReading({ ...reading, defaultBookshelf: bookshelf });
      } else {
        const newReading: BookUserProps = {
          id: `book-user-${new Date()}`,
          user: currentUser,
          book: book,
          defaultBookshelf: bookshelf,
        };

        setReading(newReading);
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
      {mostRecentReading ? (
        <Rating
          gap="md"
          size={45}
          averageRating={mostRecentReading.rating ?? 0}
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
          {reading.defaultBookshelf === "read" && (
            <Button
              variant="outline"
              color="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Lido
            </Button>
          )}{" "}
          {reading.defaultBookshelf === "want to read" && (
            <Button
              variant="outline"
              color="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              Quero ler
            </Button>
          )}
          {reading.defaultBookshelf === "reading" && (
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
