import { useEffect, useState } from "react";
import { useParams } from "react-router";
import books from "../../mocks/mockBooks";
import type { BookProps } from "../../types/book";
import Typography from "../../components/Typography";
import { StyledSection } from "./styles";

const Book = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookProps | null>();

  useEffect(() => {
    if (id) {
      const foundBook = books.find((b) => b.id === id);
      setBook(foundBook ?? null);
    }
  }, [id]);

  return book ? (
    <>livro</>
  ) : (
    <StyledSection>
      <Typography variant="h1">Livro não encontrado</Typography>
    </StyledSection>
  );
};

export default Book;
