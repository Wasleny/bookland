import type { BookProps } from "./book";
import type { Rating } from "./common";
import type { RatedCriterionProps } from "./ratingCriteria";
import type { UserProps } from "./user";

export interface ReviewProps {
  id: string;
  user: UserProps;
  book: BookProps;
  rating?: Rating;
  body?: string;
  spoiler?: boolean;
  startDate?: {day?: string, month?: string, year?: string};
  endDate?: {day?: string, month?: string, year?: string};
  mostRecentReading?: boolean;
  ratingCompositionCriteria?: RatedCriterionProps[];
  independentRatingCriteria?: RatedCriterionProps[];
  createdAt: Date;
  updatedAt?: Date;
}
