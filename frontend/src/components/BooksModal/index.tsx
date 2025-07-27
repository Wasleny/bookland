import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import Modal from "../Modal";
import Typography from "../Typography";
import Input from "../Form/Input";
import { FormActions } from "../../pages/CatalogManagement/styles";
import Button from "../Button";
import type { BookProps } from "../../types/book";
import { useBooks } from "../../hooks/useBooks";
import { Form, StyledSelect } from "./styles";
import { useAuthors } from "../../hooks/useAuthors";
import { genres } from "../../constants/genres";
import { tropes } from "../../constants/tropes";
import { useSeries } from "../../hooks/useSeries";
import { formats } from "../../constants/formats";
import type { Format } from "../../types/common";
import { languages } from "../../constants/languages";

interface BooksModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isUpdating?: boolean;
  setIsUpdating?: Dispatch<SetStateAction<boolean>>;
  bookId?: string;
}

type BookFormProps = Omit<
  BookProps,
  | "id"
  | "averageRating"
  | "reviewsCount"
  | "editionCount"
  | "ratingCount"
  | "publicationDate"
> & {
  publicationDate: string | undefined;
};

const initialState = {
  title: "",
  originalTitle: "",
  authors: [],
  mainGenre: "",
  secondaryGenres: [],
  tropes: [],
  cover: "",
  series: "",
  originalSeries: "",
  bookNumber: undefined,
  synopsis: "",
  format: undefined,
  pages: undefined,
  publicationDate: undefined,
  publisher: "",
  isbn13: "",
  isbn10: "",
  asin: "",
  language: "",
};

const BooksModal = ({
  setIsOpen,
  isOpen,
  isUpdating = false,
  setIsUpdating = () => {},
  bookId,
}: BooksModalProps) => {
  const [formData, setFormData] = useState<BookFormProps>(initialState);
  const { addBook, updateBook, getBook } = useBooks();
  const { authors } = useAuthors();
  const { allSeries } = useSeries();

  useEffect(() => {
    if (isUpdating && bookId) {
      const recoveredBook = getBook(bookId);
      const recoveredBookData = recoveredBook
        ? {
            ...recoveredBook,
            publicationDate: recoveredBook?.publicationDate
              ?.toISOString()
              .split("T")[0],
          }
        : initialState;
      setFormData(recoveredBookData);
    }
  }, [isUpdating, bookId, getBook]);

  const handleClose = () => {
    setIsOpen(false);
    setFormData(initialState);
    setIsUpdating(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formatedBook = {
      ...formData,
      publicationDate: formData.publicationDate
        ? new Date(formData.publicationDate)
        : undefined,
    };

    try {
      if (isUpdating) {
        if (!bookId) return;
        await updateBook(bookId, formatedBook);

        setIsUpdating(false);
      } else {
        await addBook(formatedBook);
      }

      handleClose();
    } catch (error) {
      console.log("Erro ao executar solicitação", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Form data-testid="form-books" onSubmit={onSubmit}>
        <Typography variant="h2">
          {isUpdating ? "Edite um livro" : "Cadastre um livro"}
        </Typography>
        <Input
          id="title"
          label="Nome do livro"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          type="text"
          value={formData.title ?? ""}
        />
        <Input
          id="original-title"
          label="Nome original do livro"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              originalTitle: e.target.value,
            }))
          }
          type="text"
          value={formData.originalTitle ?? ""}
        />
        <StyledSelect
          data-testid="select-authors"
          value={formData.authors ?? ""}
          multiple
          size={5}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              authors: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            }))
          }
        >
          <option>Selecione os autores</option>
          {authors &&
            authors.map((author, index) => (
              <option key={index} value={author.name}>
                {author.name}
              </option>
            ))}
        </StyledSelect>
        <StyledSelect
          data-testid="select-main-genre"
          value={formData.mainGenre ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              mainGenre: e.target.value,
            }))
          }
        >
          <option>Selecione o gênero principal</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          data-testid="select-secondary-genres"
          value={formData.secondaryGenres ?? ""}
          multiple
          size={5}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              secondaryGenres: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            }))
          }
        >
          <option>Selecione os gêneros secondários</option>
          {genres &&
            genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
        </StyledSelect>
        <StyledSelect
          data-testid="select-tropes"
          value={formData.tropes ?? ""}
          multiple
          size={5}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              tropes: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            }))
          }
        >
          <option>Selecione as tropes</option>
          {tropes &&
            tropes.map((trope, index) => (
              <option key={index} value={trope}>
                {trope}
              </option>
            ))}
        </StyledSelect>
        {/* cover */}
        <StyledSelect
          data-testid="select-series"
          value={formData.series ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              series: e.target.value,
            }))
          }
        >
          <option>Selecione a série</option>
          {allSeries &&
            allSeries.map((series, index) => (
              <option key={index} value={series.name}>
                {series.name}
              </option>
            ))}
        </StyledSelect>
        <StyledSelect
          data-testid="select-original-series"
          value={formData.originalSeries ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              originalSeries: e.target.value,
            }))
          }
        >
          <option>Selecione a série original</option>
          {allSeries &&
            allSeries.map((series, index) => (
              <option key={index} value={series.name}>
                {series.name}
              </option>
            ))}
        </StyledSelect>
        <Input
          id="book-number"
          label="Ordem do livro na série"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              bookNumber: parseInt(e.target.value),
            }))
          }
          type="number"
          value={String(formData.bookNumber ?? "")}
        />
        <textarea
          id="synopsis"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setFormData((prev) => ({
              ...prev,
              synopsis: e.target.value,
            }))
          }
          rows={10}
          placeholder="Sinopse do livro"
          defaultValue={formData.synopsis ?? ""}
        ></textarea>
        <StyledSelect
          data-testid="select-format"
          value={formData.format ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              format: e.target.value as Format,
            }))
          }
        >
          <option>Selecione o formato do livro</option>
          {formats.map((format, index) => (
            <option key={index} value={format}>
              {format}
            </option>
          ))}
        </StyledSelect>
        <Input
          id="pages"
          label="Quantidade de páginas"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              pages: parseInt(e.target.value),
            }))
          }
          type="number"
          value={String(formData.pages ?? "")}
        />
        <Input
          id="publication-date"
          label="Data de publicação"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              publicationDate: e.target.value,
            }))
          }
          type="date"
          value={formData.publicationDate ? formData.publicationDate : ""}
        />
        <Input
          id="publisher"
          label="Editora"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              publisher: e.target.value,
            }))
          }
          type="text"
          value={formData.publisher ?? ""}
        />
        <Input
          id="isbn13"
          label="ISBN 13"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              isbn13: e.target.value,
            }))
          }
          type="text"
          value={formData.isbn13 ?? ""}
        />
        <Input
          id="isbn10"
          label="ISBN 10"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              isbn10: e.target.value,
            }))
          }
          type="text"
          value={formData.isbn10 ?? ""}
        />
        <Input
          id="asin"
          label="ASIN"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormData((prev) => ({
              ...prev,
              asin: e.target.value,
            }))
          }
          type="text"
          value={formData.asin ?? ""}
        />
        <StyledSelect
          data-testid="select-language"
          value={formData.language ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              language: e.target.value,
            }))
          }
        >
          <option>Selecione o idioma do livro</option>
          {languages.map((format, index) => (
            <option key={index} value={format}>
              {format}
            </option>
          ))}
        </StyledSelect>
        <FormActions>
          <Button variant="remove" type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="submit" type="submit">
            {isUpdating ? "Atualizar" : "Criar"}
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
};

export default BooksModal;
