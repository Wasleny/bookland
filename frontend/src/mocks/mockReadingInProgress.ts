import type { ReadingInProgressProps } from "../types/readingInProgress";
import {mockBooks} from "./mockBooks";
import { mockUsers } from "./mockUsers";

export const mockReadingInProgress: ReadingInProgressProps[] = [
  {
    id: "reading-1",
    book: mockBooks[7],
    user: mockUsers[0],
    progress: 12,
  },
  {
    id: "reading-2",
    book: mockBooks[17],
    user: mockUsers[0],
    progress: 65,
  },
];
