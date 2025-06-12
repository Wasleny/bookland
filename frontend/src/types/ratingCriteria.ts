import type { Rating } from "./common";

export interface RatingCriteriaProps {
    id: string;
    userId: string;
    name: string;
    description: string;
}

export interface RatedCriterionProps {
  criterion: RatingCriteriaProps;
  rating: Rating | null;
}