import type { BookProps } from "../../../types/book";
import BookBadges from "../../BookBadges";
import Card from "../../Card";
import Typography from "../../Typography";

interface RatingBookHeaderProps {
  book: BookProps;
}

const RatingBookHeader = ({ book }: RatingBookHeaderProps) => {
  return (
    <>
      <Card width="full">
        <Typography variant="title">{book.title}</Typography>
        <Typography variant="authorName">
          {book.authors.map((author, index) => {
            if (index < book.authors.length - 1) {
              return `${author}, `;
            }
            return author;
          })}
        </Typography>
      </Card>
      <Card width="full">
        <BookBadges marginTop="none" book={book} />
      </Card>
    </>
  );
};

export default RatingBookHeader;
