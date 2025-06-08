import { useParams } from "react-router";
import Typography from "../../components/Typography";
import { useEffect, useState } from "react";
import type { BookProps } from "../../types/book";
import { useAuth } from "../../hooks/useAuth";
import { useBooks } from "../../hooks/useBooks";
import type { ReviewProps } from "../../types/review";
import Card from "../../components/Card";
import BookBadges from "../../components/BookBadges";
import NotFound from "../../components/NotFound";

const RatingBook = () => {
  const { id } = useParams<{ id: string }>();
  const { getBook, getUserReadings, isLoading } = useBooks();
  const [book, setBook] = useState<BookProps | null>();
  const [userReadings, setUserReadings] = useState<ReviewProps[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (id) {
      const userId = currentUser?.id;
      setBook(getBook(id) ?? null);
      if (userId) setUserReadings(getUserReadings(userId, id) ?? []);
    }
  }, [currentUser, id, getBook, getUserReadings]);

  useEffect(() => {
    if (id) {
      setBook(getBook(id) ?? null);
    }
  }, [id, getBook]);

  if (isLoading)
    return <Typography variant="body">Carregando livro...</Typography>;

  return book ? (
    <>
      <Typography variant="title">{book?.title}</Typography>
      <Card>
        <BookBadges book={book} />
      </Card>
    </>
  ) : (
    <NotFound />
  );
};

export default RatingBook;
