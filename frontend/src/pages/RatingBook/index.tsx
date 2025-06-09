import { useParams } from "react-router";
import Typography from "../../components/Typography";
import { useEffect, useState } from "react";
import type { BookProps } from "../../types/book";
import { useBooks } from "../../hooks/useBooks";
import NotFound from "../../components/NotFound";
import Section from "../../components/Section";
import RatingBookHeader from "../../components/RatingBook/Header";
import RatingBookCollapsible from "../../components/RatingBook/Collapsible";

const RatingBook = () => {
  const { id } = useParams<{ id: string }>();
  const { getBook, isLoading } = useBooks();
  const [book, setBook] = useState<BookProps | null>();

  useEffect(() => {
    if (id) {
      setBook(getBook(id) ?? null);
    }
  }, [id, getBook]);

  useEffect(() => {
    if (id) {
      setBook(getBook(id) ?? null);
    }
  }, [id, getBook]);

  if (isLoading)
    return <Typography variant="body">Carregando livro...</Typography>;

  return book ? (
    <Section gap="lg">
      <RatingBookHeader book={book} />
      <RatingBookCollapsible book={book} />
    </Section>
  ) : (
    <NotFound />
  );
};

export default RatingBook;
