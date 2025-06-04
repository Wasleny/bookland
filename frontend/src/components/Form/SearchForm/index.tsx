import { type FormEvent } from "react";
import Input from "../Input";
import { StyledSearchGroup } from "./styles";
import Button from "../../Button";

interface SearchFormProps {
  placeholder: string;
  setSearch: (search: string) => void;
  search: string;
  onSubmit: (event: FormEvent) => void;
}

const SearchForm = ({ placeholder, setSearch, search, onSubmit }: SearchFormProps) => {
  return (
    <StyledSearchGroup>
      <form onSubmit={(e) => onSubmit(e)}>
        <Input
          id="search"
          label=""
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          value={search}
          type="search"
        />

        <Button type='submit' variant="search">Buscar</Button>
      </form>
    </StyledSearchGroup>
  );
};

export default SearchForm;
