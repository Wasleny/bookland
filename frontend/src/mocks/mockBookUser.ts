import type { BookUserProps } from "../types/bookUser";
import {mockBooks} from "./mockBooks";
import { mockUsers } from "./mockUsers";

export const mockBookUser: BookUserProps[] = [
  {
    id: "book-user-1",
    book: mockBooks[29],
    user: mockUsers[0],
    defaultBookshelf: "read",
  },
  {
    id: "book-user-2",
    book: mockBooks[11],
    user: mockUsers[0],
    defaultBookshelf: "read",
  },
  {
    id: "book-user-3",
    book: mockBooks[7],
    user: mockUsers[0],
    defaultBookshelf: "reading",
  },
  {
    id: "book-user-4",
    book: mockBooks[23],
    user: mockUsers[0],
    defaultBookshelf: "want to read",
  },
  {
    id: "book-user-5",
    book: mockBooks[17],
    user: mockUsers[0],
    defaultBookshelf: "reading",
  },
  {
    id: "book-user-6",
    book: mockBooks[2],
    user: mockUsers[1],
    defaultBookshelf: "want to read",
  },
  {
    id: "book-user-7",
    book: mockBooks[8],
    user: mockUsers[1],
    defaultBookshelf: "want to read",
  },
  {
    id: "book-user-8",
    book: mockBooks[5],
    user: mockUsers[1],
    defaultBookshelf: "want to read",
  },
  {
    id: "book-user-9",
    book: mockBooks[11],
    user: mockUsers[1],
    defaultBookshelf: "read",
  },
];
