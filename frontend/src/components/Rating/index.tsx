import { FaStar } from "react-icons/fa";
import { PartialStar, StyledRating } from "./styles";
import Typography from "../Typography";
import type { Spacing } from "../../types/common";

interface RatingProps {
  size: number;
  averageRating?: number; // between 1 and 5
  rating?: number;
  editions?: number;
  reviews?: number | null;
  gap?: Spacing;
  flag?: "personal" | "average";
}

const Rating = ({
  size,
  averageRating = 0,
  rating = 0,
  editions = 0,
  reviews = null,
  gap = "md",
  flag = "average",
}: RatingProps) => {
  const strokeWidth = 30;

  const integer = Math.floor(averageRating);
  const notFilledPercentage = (averageRating - integer) * 100;
  const hasPartial = notFilledPercentage > 0;

  const filledStars = integer;
  const outlineStars = hasPartial ? 5 - filledStars - 1 : 5 - filledStars;

  return (
    <StyledRating gap={gap} strokeWidth={strokeWidth}>
      <div>
        {Array.from({ length: filledStars }).map((_, i) => {
          return <FaStar key={i} size={size} className="filled-star" />;
        })}

        {hasPartial && (
          <PartialStar
            strokeWidth={strokeWidth}
            size={size}
            notFilledPercentage={notFilledPercentage}
          >
            <FaStar size={size} className="base-masked-star" />
            <FaStar size={size} className="masked-overlay-star" />
          </PartialStar>
        )}

        {outlineStars > 0 &&
          Array.from({ length: outlineStars }).map((_, i) => {
            return <FaStar key={i} size={size} className="outline-star" />;
          })}
      </div>

      {flag === "average" && averageRating > 0 && (
        <Typography variant="legend">
          {averageRating} de média — {rating} avaliações — {editions}{" "}
          {editions === 1 ? "edição" : "edições"}
          {reviews && `— ${reviews} resenhas`}
        </Typography>
      )}
    </StyledRating>
  );
};

export default Rating;
