import { useEffect, useState } from "react";
import Card from "../../components/Card";
import type { Bookshelf } from "../../types/common";
import { Books, ItemList, List, SectionMyShelves } from "./styles";
import { useBooks } from "../../hooks/useBooks";
import { useAuth } from "../../hooks/useAuth";
import type { BookUserProps } from "../../types/bookUser";
import Cover from "../../components/Cover";
import Typography from "../../components/Typography";
import { useParams } from "react-router";

const shelves = [
  { key: "read", label: "Lidos" },
  { key: "reading", label: "Lendo" },
  { key: "want to read", label: "Quero ler" },
];

const MyShelves = () => {
  const [bookshelf, setBookshelf] = useState<Bookshelf>("read");
  const [entries, setEntries] = useState<BookUserProps[]>([]);
  const { getUserBookshelfEntries } = useBooks();
  const { currentUser } = useAuth();
  const { shelf } = useParams<{ shelf: Bookshelf }>();

  useEffect(() => {
    if (!currentUser) return;

    const allBooksUser = getUserBookshelfEntries(currentUser.id);
    if (!allBooksUser) return;

    setEntries(allBooksUser);

    if (shelf) setBookshelf(shelf);
  }, [currentUser, getUserBookshelfEntries, shelf]);

  return (
    <SectionMyShelves>
      <Card>
        <List>
          <ItemList onClick={() => setBookshelf("read")}>
            {shelves[0].label}
          </ItemList>
          <ItemList onClick={() => setBookshelf("reading")}>
            {shelves[1].label}
          </ItemList>
          <ItemList onClick={() => setBookshelf("want to read")}>
            {shelves[2].label}
          </ItemList>
        </List>
      </Card>
      {entries.length > 0 && (
        <Books>
          <Typography variant="h1">
            {shelves.find((s) => s.key === bookshelf)?.label}
          </Typography>
          {entries
            .filter((e) => e.defaultBookshelf === bookshelf)
            .map((entry, index) => (
              <Cover
                key={index}
                path={entry.book.cover}
                size="sm"
                alt={`Capa do livro ${entry.book.title}`}
                title={entry.book.title}
              />
            ))}
        </Books>
      )}
    </SectionMyShelves>
  );
};

export default MyShelves;
