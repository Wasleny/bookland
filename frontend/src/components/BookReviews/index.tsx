import { useEffect, useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import type { ReviewProps } from "../../types/review";
import { ReviewBody, ReviewsSection } from "./styles";
import Typography from "../Typography";
import Avatar from "../Avatar";
import Rating from "../Rating";
import { months } from "../../constants/months";
import Card from "../Card";

interface BookReviewsProps {
  id: string | undefined;
}

const BookReviews = ({ id }: BookReviewsProps) => {
  const { getBookReviews } = useBooks();
  const [bookReviews, setBookReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    if (id) setBookReviews(getBookReviews(id) ?? []);
  }, [id, getBookReviews]);

  return (
    bookReviews.length > 0 && (
      <ReviewsSection>
        <Typography variant="h2">Resenhas</Typography>
        {bookReviews.map((review) => (
          <Card key={review.id} gap="lg" width="full" flexDirection="row">
            <header>
              <Avatar path={review.user.avatarUrl} />
              <Typography variant="body">{review.user.name}</Typography>
              <Typography variant="avatarLegend">
                {review.user.ratingsCount} avaliações
              </Typography>
              <Typography variant="avatarLegend">
                {review.user.reviewsCount} resenhas
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
                  {review.createdAt.getDate() < 10
                    ? `0${review.createdAt.getDate()}`
                    : review.createdAt.getDate()}{" "}
                  de {months[review.createdAt.getMonth()]} de{" "}
                  {review.createdAt.getFullYear()}
                </Typography>
              </div>
              <Typography variant="review">{review.body}</Typography>
            </ReviewBody>
          </Card>
        ))}
      </ReviewsSection>
    )
  );
};

export default BookReviews;
