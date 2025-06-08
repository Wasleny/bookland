import Badge from "../Badge";
import Rating from "../Rating";
import Typography from "../Typography";
import type { BookProps } from "../../types/book";
import { Badges } from "../../pages/styles";
import { Edition, InformationSection } from "./styles";

interface BookInformationProps {
  book: BookProps;
}

const BookInformation = ({ book }: BookInformationProps) => {
  return (
    <InformationSection>
      {book.series && (
        <Typography variant="link">
          {book.series} #{book.bookNumber}
        </Typography>
      )}
      <Typography variant="title">{book.title}</Typography>
      <Typography variant="authorName">
        {book.authors.map((author, index) => {
          if (index < book.authors.length - 1) {
            return `${author},`;
          }
          return author;
        })}
      </Typography>
      <Rating
        averageRating={book.averageRating}
        rating={book.ratingsCount}
        editions={book.editionCount}
        reviews={book.reviewsCount}
        size={25}
      />
      <Typography variant="review">{book.synopsis}</Typography>
      <Badges>
        {book.mainGenre && <Badge type="genre">{book.mainGenre}</Badge>}
        {book.secondaryGenres &&
          book.secondaryGenres.map((genre) => (
            <Badge key={genre} type="genre">
              {genre}
            </Badge>
          ))}
        {book.tropes &&
          book.tropes.map((trope) => (
            <Badge key={trope} type="trope">
              {trope}
            </Badge>
          ))}
      </Badges>
      <Edition>
        <Typography variant="editionTitle">Detalhes da Edição</Typography>
        <dl>
          <div>
            <dt>Título Original:</dt>
            <dd>{book.originalTitle}</dd>
          </div>
          {book.originalSeries && (
            <div>
              <dt>Série:</dt>
              <dd>{book.originalSeries}</dd>
            </div>
          )}
          <div>
            <dt>Formato:</dt>
            <dd>
              {book.pages} páginas, {book.format}
            </dd>
          </div>
          {book.isbn13 && (
            <div>
              <dt>ISBN:</dt>
              <dd>
                {book.isbn13} {book.isbn10 ? `(${book.isbn10})` : ""}
              </dd>
            </div>
          )}
          {book.asin && (
            <div>
              <dt>ASIN:</dt>
              <dd>{book.asin}</dd>
            </div>
          )}
          <div>
            <dt>Idioma:</dt>
            <dd>{book.language}</dd>
          </div>
        </dl>
      </Edition>
    </InformationSection>
  );
};

export default BookInformation;
