import { useState, type FormEvent } from "react";
import SearchForm from "../../components/Form/SearchForm";
import type { BookProps } from "../../types/book";
import {
  CardHeader,
  SearchCard,
  SearchResults,
  StyledSection,
} from "./styles";
import Typography from "../../components/Typography";
import Cover from "../../components/Cover";
import { useNavigate } from "react-router";
import Rating from "../../components/Rating";
import { useBooks } from "../../hooks/useBooks";

const Search = () => {
  const { searchBooks } = useBooks();
  const [results, setResults] = useState<BookProps[]>([]);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();
  const breakpoint = "md";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSearchField(search);
    setResults(searchBooks(search) ?? []);
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
            <SearchResults>
              {results.map((result) => (
                <SearchCard
                  verticalPadding="xl"
                  horizontalPadding="xl"
                  gap="md"
                  key={result.id}
                >
                  <CardHeader breakpoint={breakpoint}>
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
                      <Rating
                        size={30}
                        averageRating={result.averageRating ?? 0}
                        rating={result.ratingsCount ?? 0}
                        editions={result.editionCount ?? 1}
                      />
                    </div>
                  </CardHeader>
                </SearchCard>
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
