import type { BookProps } from "./book";
import type { UserProps } from "./user";

export interface ReadingInProgressProps {
  id: string;
  book: BookProps;
  user: UserProps;
  progress: number; // 0 to 100 - percentage
}
