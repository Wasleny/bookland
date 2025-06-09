import type { ReviewProps } from "../../../types/review";
import Button from "../../Button";
import Card from "../../Card";
import Collapsible from "../../Collapsible";
import Rating from "../../Rating";
import Typography from "../../Typography";
import BookCriteria from "./Criteria";
import { Actions } from "./styles";

interface RatingBookReviewProps {
  review: ReviewProps;
  onDelete: (reviewId: string) => void;
  handleUpdate: (reviewId: string) => void;
}

type DateProps = {
  day?: string;
  month?: string;
  year?: string;
};

const RatingBookReview = ({
  review,
  onDelete,
  handleUpdate,
}: RatingBookReviewProps) => {
  const formatDate = (date: DateProps) => {
    const arrayDate = [];

    if (date.day) arrayDate.push(date.day);
    if (date.month) arrayDate.push(date.month);
    if (date.year) arrayDate.push(date.year);

    return arrayDate.join("/");
  };

  const handleTitle = () => {
    const startDate = formatDate(review.startDate ?? {});
    const endDate = formatDate(review.endDate ?? {});

    if (startDate && endDate) return `${startDate} - ${endDate}`;
    if (startDate && !endDate) return `${startDate} - ?`;
    if (!startDate && endDate) return `? - ${endDate}`;

    return "Leitura - período indeterminado";
  };

  return (
    <Card width="full">
      <Collapsible hasButton={false} title={handleTitle()} variantTitle="h3">
        <Rating
          averageRating={review.rating}
          size={25}
          flag="personal"
          gap="sm"
        />
        <Typography
          variant="review"
          marginTop="lg"
        >{`"${review.body}"`}</Typography>

        <BookCriteria
          rating={review.rating ?? "0"}
          independent={review.independentRatingCriteria ?? []}
          composition={review.ratingCompositionCriteria ?? []}
        />

        <Actions>
          <Button variant="edit" onClick={() => handleUpdate(review.id)}>Editar leitura</Button>
          <Button variant="remove" onClick={() => onDelete(review.id)}>
            Excluir leitura
          </Button>
        </Actions>
      </Collapsible>
    </Card>
  );
};

export default RatingBookReview;
