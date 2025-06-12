import type { BookProps } from "./book";
import type { Bookshelf } from "./common";
import type { UserProps } from "./user";

export interface BookUserProps {
    id: string;
    book: BookProps;
    user: UserProps;
    defaultBookshelf: Bookshelf
}