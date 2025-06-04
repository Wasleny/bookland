import { useState, type FormEvent } from "react";
import SearchForm from "../../components/Form/SearchForm";
import books from "../../mocks/mockBooks";
import type { BookProps } from "../../types/book";
import { SearchResults, StyledSection } from "./styles";
import Card from "../../components/Card";
import { normalizeText } from "../../utils/normalizeText";
import Typography from "../../components/Typography";
import Cover from "../../components/Cover";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Rating from "../../components/Rating";

const Search = () => {
  const [results, setResults] = useState<BookProps[]>([]);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalizedSearch = normalizeText(search);
    setSearchField(search);

    const filtered = books.filter((book) => {
      const normalizedTitle = normalizeText(book.title);
      const normalizedSeries = book.series ? normalizeText(book.series) : "";
      const normalizedAuthors = book.authors?.map((author) =>
        normalizeText(author)
      );

      return (
        book.asin?.includes(normalizedSearch) ||
        book.isbn10?.includes(normalizedSearch) ||
        book.isbn13?.includes(normalizedSearch) ||
        normalizedTitle.includes(normalizedSearch) ||
        normalizedSeries.includes(normalizedSearch) ||
        normalizedAuthors?.some((author) => author.includes(normalizedSearch))
      );
    });

    setResults(filtered);
  };

  return (
    <>
      <SearchForm
        onSubmit={onSubmit}
        search={search}
        setSearch={setSearch}
        placeholder="Busque sua próxima leitura..."
      />

      <StyledSection>
        {results.length > 0 ? (
          <>
            <Typography variant="h1">
              Resultado da busca: <i>{searchField}</i>
            </Typography>
            <SearchResults breakpoint='md'>
              {results.map((result) => (
                <Card
                  verticalPadding="xl"
                  horizontalPadding="xl"
                  key={result.id}
                >
                  <header className="card-head">
                    <Cover
                      size="elementXl"
                      onClick={() => navigate(`/book/${result.id}`)}
                      path={result.cover}
                      alt={`Capa do livro ${result.title}`}
                    />
                    <div>
                      <Typography variant="searchTitle">
                        {result.title}
                      </Typography>
                      <Typography variant="h3">
                        {result.authors.map((author) => `${author} `)}
                      </Typography>
                      {result.series && (
                        <Typography variant="link">
                          {result.series} #{result.bookNumber}
                        </Typography>
                      )}
                      <Rating size={30} averageRating={result.averageRating ?? 0} rating={result.ratingsCount ?? 0} editions={result.editionCount ?? 1}  />
                    </div>
                  </header>
                  <footer>
                    <Button variant="submit">Adicionar à estante</Button>
                  </footer>
                </Card>
              ))}
            </SearchResults>
          </>
        ) : (
          ""
        )}
      </StyledSection>
    </>
  );
};

export default Search;
