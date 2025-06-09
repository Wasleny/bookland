import type { BookProps } from "../../types/book";
import type { Spacing } from "../../types/common";
import Badge from "../Badge";
import { Badges } from "./styles";

interface BookBadgesProps {
  book: BookProps;
  marginTop?: Spacing
}

const BookBadges = ({ book, marginTop = 'md' }: BookBadgesProps) => {
  return (
    <Badges marginTop={marginTop}>
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
