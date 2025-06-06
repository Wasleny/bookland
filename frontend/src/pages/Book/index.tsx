import { useEffect, useState } from "react";
import { useParams } from "react-router";
import books from "../../mocks/mockBooks";
import type { BookProps } from "../../types/book";
import Typography from "../../components/Typography";
import {
  Badges,
  BookActions,
  BookSection,
  Edition,
  InformationSection,
  NotFoundSection,
  Review,
  ReviewBody,
  ReviewsSection,
} from "./styles";
import Cover from "../../components/Cover";
import Rating from "../../components/Rating";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import { useAuth } from "../../hooks/useAuth";
import usersReadings from "../../mocks/mockUsersReadings";
import type { ReviewProps } from "../../types/review";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import type { Status } from "../../types/common";

const Book = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookProps | null>();
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reading, setReading] = useState<ReviewProps | null>(null);
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const months: { [key: number]: string } = {
    0: "janeiro",
    1: "fevereiro",
    2: "março",
    3: "abril",
    4: "maio",
    5: "junho",
    6: "julho",
    7: "agosto",
    8: "setembro",
    9: "outubro",
    10: "novembro",
    11: "dezembro",
  };

  useEffect(() => {
    if (!currentUser) setReading(null);
    if (id) {
      const user = currentUser?.id;
      const foundBook = books.find((b) => b.id === id);
      setBook(foundBook ?? null);

      const userReading = usersReadings.find(
        (r) => r.book.id === id && r.user.id == user
      );

      if (userReading) {
        setReading(userReading);
      }

      setReviews(
        usersReadings.filter(
          (review) =>
            review.book.id === id && review.body && review.status === "read"
        )
      );
    }
  }, [id, currentUser]);

  const onUpdate = (bookshelf: Status) => {
    if (currentUser && book) {
      if (reading) {
        if (bookshelf !== "not added")
          setReading({ ...reading, status: bookshelf });
        else setReading(null);
      } else if (bookshelf !== "not added") {
        const newReading: ReviewProps = {
          id: `review-${usersReadings.length + 1}`,
          user: currentUser,
          book: book,
          status: bookshelf,
          createdAt: new Date(),
        };
        setReading(newReading);
      }

      setIsModalOpen(false);
    }
  };

  return book ? (
    <>
      <BookSection>
        <BookActions>
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

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Typography variant="h2">Adicionar à Biblioteca</Typography>
            <section className="options">
              <Button
                color="primary"
                variant="outline"
                onClick={() => onUpdate("read")}
              >
                Lido
              </Button>
              <Button
                color="secondary"
                variant="outline"
                onClick={() => onUpdate("to read")}
              >
                Quero Ler
              </Button>
              <Button
                color="accent"
                variant="outline"
                onClick={() => onUpdate("reading")}
              >
                Lendo
              </Button>
              <Typography variant="body" onClick={() => onUpdate("not added")}>
                Remover da biblioteca
              </Typography>
            </section>
          </Modal>
        </BookActions>
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
      </BookSection>

      {reviews.length > 0 && (
        <ReviewsSection>
          <Typography variant="h2">Resenhas</Typography>
          {reviews.map((review) => (
            <Review key={review.id}>
              <Card>
                <header>
                  <Avatar path={review.user.avatarUrl} />
                  <Typography variant="body">{review.user.name}</Typography>
                  <Typography variant="avatarLegend">
                    {}
                    {review.user.ratingCount} avaliações
                  </Typography>
                  <Typography variant="avatarLegend">
                    {review.user.reviewCount} resenhas
                  </Typography>
                </header>
                <ReviewBody>
                  <div>
                    <Rating
                      size={20}
                      gap="xs"
                      flag="personal"
                      averageRating={review.rating}
                    />
                    <Typography variant="bodyItalic">
                      {review.createdAt.getDay() < 10
                        ? `0${review.createdAt.getDay()}`
                        : review.createdAt.getDay()}{" "}
                      de {months[review.createdAt.getMonth()]} de{" "}
                      {review.createdAt.getFullYear()}
                    </Typography>
                  </div>
                  <Typography variant="review">{review.body}</Typography>
                </ReviewBody>
              </Card>
            </Review>
          ))}
        </ReviewsSection>
      )}
    </>
  ) : (
    <NotFoundSection>
      <Typography variant="h1">Livro não encontrado</Typography>
    </NotFoundSection>
  );
};

export default Book;
