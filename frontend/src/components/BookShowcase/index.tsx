import { useNavigate } from "react-router";
import Button from "../Button";
import Carousel from "../Carousel";
import Typography from "../Typography";
import { FeaturedBookGenre } from "./styles";
import Cover from "../Cover";
import { useBooks } from "../../hooks/useBooks";

const BookShowcase = () => {
  const navigate = useNavigate();
  const { books, isLoading } = useBooks();
  
  if (!books) return null;

  if (isLoading) return <Typography variant="body">Carregando destaques...</Typography>;

  const booksCarousel = [
    books[1],
    books[4],
    books[6],
    books[7],
    books[8],
    books[9],
    books[10],
    books[12],
    books[19],
    books[23],
  ];

  return (
    <section data-testid="book-showcase">
      <Typography variant="h2">Destaques</Typography>
      <Carousel
        items={booksCarousel.map((book) => (
          <FeaturedBookGenre key={book.id}>
            <Typography variant="h3">{book.mainGenre}</Typography>
            <Cover
              onClick={() => navigate(`book/${book.id}`)}
              path={book.cover}
              alt="book"
              size="p80"
            />
            <Typography variant="cardTitle">{book.title}</Typography>
            <Typography variant="h4">{book.authors}</Typography>
            <Button variant="show">Ver mais</Button>
          </FeaturedBookGenre>
        ))}
      />
    </section>
  );
};

export default BookShowcase;
