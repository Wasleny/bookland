import type { UserBookInteractionProps } from "../types/userBookInteraction";
import books from "./mockBooks";

const usersReadings: UserBookInteractionProps[] = [
  {
    userId: "user-1",
    book: { ...books[29] },
    status: "read",
    rating: 5
  },
  {
    userId: "user-1",
    book: { ...books[11] },
    rating: 3,
    status: "read",
  },
  {
    userId: "user-1",
    book: { ...books[7] },
    status: "reading",
    progress: 53,
  },
  {
    userId: "user-1",
    book: { ...books[23] },
    status: "reading",
    progress: 12,
  },
  {
    userId: "user-2",
    book: { ...books[17] },
    status: "read",
    rating: 4,
  },
  {
    userId: "user-6",
    book: { ...books[2] },
    status: "reading",
    progress: 24,
  },
  {
    userId: "user-10",
    book: { ...books[2] },
    status: "reading",
    progress: 48,
  },
];

export default usersReadings;
