import type { BookProps } from "./book";
import type { Rating, Status } from "./common";
import type { ReviewProps } from "./review";

export interface UserBookInteractionProps {
    userId: string;
    book: BookProps;
    status: Status;
    rating?: Rating;
    progress?: number; // 0 - 100 %
    review?: ReviewProps;
    startDate?: Date;
    endDate?: Date;
}