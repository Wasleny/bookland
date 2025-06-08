import { useEffect, useState } from "react";
import Avatar from "../../../components/Avatar";
import Card from "../../../components/Card";
import Rating from "../../../components/Rating";
import Typography from "../../../components/Typography";
import { months } from "../../../constants/months";
import { useBooks } from "../../../hooks/useBooks";
import { Review, ReviewBody, ReviewsSection } from "../styles";
import type { ReviewProps } from "../../../types/review";

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
          </Review>
        ))}
      </ReviewsSection>
    )
  );
};

export default BookReviews;
