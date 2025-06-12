import type { BookProps } from "../../types/book";
import { Dl, Row } from "./styles";

const Book = ({ book }: { book: BookProps }) => {
  return (
    <Dl>
      {book.originalTitle && (
        <Row>
          <dt>Título original:</dt>
          <dd>{book.originalTitle}</dd>
        </Row>
      )}
      {book.authors.length > 0 && (
        <Row>
          <dt>Autor(es):</dt>
          <dd>
            {book.authors.map((author, index) => {
              if (index < book.authors.length - 1) return `${author},`;
              return author;
            })}
          </dd>
        </Row>
      )}
      {book.mainGenre && (
        <Row>
          <dt>Gênero principal:</dt>
          <dd>{book.mainGenre}</dd>
        </Row>
      )}
      {book.secondaryGenres && book.secondaryGenres.length > 0 && (
        <Row>
          <dt>Gêneros secundários:</dt>
          <dd>
            {book.secondaryGenres.map((genre, index) => {
              if (
                book.secondaryGenres &&
                index < book.secondaryGenres.length - 1
              )
                return `${genre}, `;
              return genre;
            })}
          </dd>
        </Row>
      )}
      {book.tropes && book.tropes.length > 0 && (
        <Row>
          <dt>Tropes:</dt>
          <dd>
            {book.tropes.map((trope, index) => {
              if (book.tropes && index < book.tropes.length - 1)
                return `${trope}, `;
              return trope;
            })}
          </dd>
        </Row>
      )}
      {book.series && (
        <Row>
          <dt>Série:</dt>
          <dd>
            {book.series} {book.bookNumber ? `#${book.bookNumber}` : ""}
          </dd>
        </Row>
      )}
      {book.originalSeries && (
        <Row>
          <dt>Série original:</dt>
          <dd>
            {book.originalSeries} {book.bookNumber ? `#${book.bookNumber}` : ""}
          </dd>
        </Row>
      )}
      {book.synopsis && (
        <Row>
          <dt>Sinopse:</dt>
          <dd>{book.synopsis}</dd>
        </Row>
      )}
      {book.format && (
        <Row>
          <dt>Formato:</dt>
          <dd>{book.format}</dd>
        </Row>
      )}
      {book.format && (
        <Row>
          <dt>Formato:</dt>
          <dd>{book.format}</dd>
        </Row>
      )}
      {book.pages && (
        <Row>
          <dt>Quantidade de páginas:</dt>
          <dd>{book.pages}</dd>
        </Row>
      )}
      {book.publicationDate && (
        <Row>
          <dt>Data de publicação:</dt>
          <dd>{book.publicationDate.toLocaleDateString()}</dd>
        </Row>
      )}
      {book.publisher && (
        <Row>
          <dt>Editora:</dt>
          <dd>{book.publisher}</dd>
        </Row>
      )}
      {book.isbn13 && (
        <Row>
          <dt>ISBN:</dt>
          <dd>
            {book.isbn13} {book.isbn10 ? `(${book.isbn10})` : ""}
          </dd>
        </Row>
      )}
      {book.asin && (
        <Row>
          <dt>ASIN:</dt>
          <dd>{book.asin}</dd>
        </Row>
      )}
      {book.language && (
        <Row>
          <dt>Idioma:</dt>
          <dd>{book.language}</dd>
        </Row>
      )}
    </Dl>
  );
};

export default Book;
