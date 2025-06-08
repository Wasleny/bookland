import type { BookProps } from "../../types/book";
import Badge from "../Badge";
import { Badges } from "./styles";

interface BookBadgesProps {
  book: BookProps;
}

const BookBadges = ({ book }: BookBadgesProps) => {
  return (
    <Badges>
      {book.mainGenre && <Badge type="genre">{book.mainGenre}</Badge>}
      {book.secondaryGenres &&
        book.secondaryGenres.map((genre) => (
          <Badge key={genre} type="genre">
            {genre}
          </Badge>
        ))}
      {book.tropes &&
        book.tropes.map((trope) => (
          <Badge key={trope} type="trope">
            {trope}
          </Badge>
        ))}
    </Badges>
  );
};

export default BookBadges;
