import { FaStar } from "react-icons/fa";
import { PartialStar, StyledRating } from "./styles";
import { useEffect, useState } from "react";
import Typography from "../Typography";

interface RatingProps {
  size: number;
  averageRating: number; // between 1 and 5
  rating: number;
  editions: number;
}

const Rating = ({ size, averageRating, rating, editions }: RatingProps) => {
  const [filledStars, setFilledStarts] = useState<number>(0);
  const [notFilledPercentage, setNotFilledPercentage] = useState<number>(0);
  const strokeWidth = 30;

  useEffect(() => {
    const integer = Math.floor(averageRating);
    setFilledStarts(integer);
    setNotFilledPercentage((averageRating - integer) * 100);
  }, [averageRating]);

  return (
    <StyledRating strokeWidth={strokeWidth}>
      <div>
        {Array.from({ length: filledStars ?? 0 }).map((_, i) => {
          return <FaStar key={i} size={size} className="filled-star" />;
        })}

        {notFilledPercentage > 0 ? (
          <PartialStar
            strokeWidth={strokeWidth}
            size={size}
            notFilledPercentage={notFilledPercentage}
          >
            <FaStar size={size} className="base-masked-star" />
            <FaStar size={size} className="masked-overlay-star" />
          </PartialStar>
        ) : (
          <FaStar size={size} className="outline-star" />
        )}
      </div>

      <Typography variant="legend">
        {averageRating} de média — {rating} avaliações — {editions} {editions === 1 ? 'edição' : 'edições'}
      </Typography>
    </StyledRating>
  );
};

export default Rating;
