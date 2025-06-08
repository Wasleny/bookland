import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { BookProps } from "../../types/book";
import { BookSection } from "./styles";
import { useBooks } from "../../hooks/useBooks";
import NotFound from "../../components/NotFound";
import BookInformation from "../../components/BookInformation";
import BookReviews from "../../components/BookReviews";
import BookHeader from "../../components/BookHeader";
import Typography from "../../components/Typography";

const Book = () => {
  const { id } = useParams<{ id: string }>();
  const { getBook, isLoading } = useBooks();
  const [book, setBook] = useState<BookProps | null>(null);

  useEffect(() => {
    if (id) {
      setBook(getBook(id) ?? null);
    }
  }, [id, getBook]);

  if (isLoading) return <Typography variant="body">Loading...</Typography>;

  return book ? (
    <>
      <BookSection>
        <BookHeader book={book} />
        <BookInformation book={book} />
      </BookSection>

      <BookReviews id={id} />
    </>
  ) : (
    <NotFound />
  );
};

export default Book;
