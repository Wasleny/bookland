import type { Rating } from "./common";

export interface RatingCriteria {
    id: string;
    userId: string;
    name: string;
    description: string;
}

export interface RatedCriterionProps {
  criterion: RatingCriteria;
  rating: Rating | null;
}