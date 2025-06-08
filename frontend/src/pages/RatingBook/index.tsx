import { useParams } from "react-router";
import Typography from "../../components/Typography";
import { useEffect, useState } from "react";
import type { BookProps } from "../../types/book";
import { useAuth } from "../../hooks/useAuth";
import { useBooks } from "../../hooks/useBooks";
import type { ReviewProps } from "../../types/review";

const RatingBook = () => {
  const { id } = useParams<{ id: string }>();
  const { getBook, getUserReadings } = useBooks();
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

  return (
    <>
      <Typography variant="title">{book?.title}</Typography>
    </>
  );
};

export default RatingBook;
