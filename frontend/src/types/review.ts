import type { BookProps } from "./book";
import type { Rating, Status } from "./common";
import type { RatedCriterionProps } from "./ratingCriteria";
import type { UserProps } from "./user";

export interface ReviewProps {
  id: string;
  user: UserProps;
  book: BookProps;
  status: Status;
  rating?: Rating;
  progress?: number; // 0 - 100 %
  body?: string;
  createdAt: Date;
  updatedAt?: Date;
  spoiler?: boolean;
  startDate?: {day?: string, month?: string, year?: string};
  endDate?: {day?: string, month?: string, year?: string};
  mostRecentReading?: boolean;
  ratingCompositionCriteria?: RatedCriterionProps[];
  independentRatingCriteria?: RatedCriterionProps[];
}
