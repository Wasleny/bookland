import type { Rating } from "./common";
import type { RatedCriterionProps } from "./ratingCriteria";
import type { UserProps } from "./user";

export interface ReviewProps {
  id: string;
  user?: UserProps;
  rating: Rating;
  body: string;
  createdAt: Date;
  updatedAt?: Date;
  spoiler?: boolean;
  startDate?: Date;
  endDate?: Date;
  mostRecentReading?: boolean;
  ratingCompositionCriteria?: RatedCriterionProps[];
  independentRatingCriteria?: RatedCriterionProps[];
}
