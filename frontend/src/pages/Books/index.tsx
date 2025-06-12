import { useState } from "react";
import Section from "../../components/Section";
import Typography from "../../components/Typography";
import { Actions, Div, List } from "./styles";
import Button from "../../components/Button";
import { useBooks } from "../../hooks/useBooks";
import BooksModal from "../../components/BooksModal";
import Collapsible from "../../components/Collapsible";
import Book from "./Book";

const Books = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [book, setBook] = useState("");
  const { books, isLoading, deleteBook } = useBooks();

  const handleUpdate = (id: string) => {
    setBook(id);
    setIsModalOpen(true);
    setIsUpdating(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
    } catch (error) {
      console.log("Erro ao excluir livro", error);
    }
  };

  return isLoading ? (
    <Typography variant="body">Carregando...</Typography>
  ) : (
    <Section>
      <Div>
        <Typography variant="h1">Livros Cadastrados</Typography>
        <Button variant="submit" onClick={() => setIsModalOpen(true)}>
          Cadastrar livro
        </Button>
      </Div>
      <BooksModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        bookId={book}
      />

      {books && books.length > 0 ? (
        <List>
          {books.map((book, index) => (
            <li key={index}>
              <Collapsible
                hasButton={false}
                title={book.title}
                variantTitle="h2"
              >
                <Book book={book} />
                <Actions>
                  <Button variant="edit" onClick={() => handleUpdate(book.id)}>
                    Editar
                  </Button>
                  <Button variant="remove" onClick={() => handleDelete(book.id)}>Excluir</Button>
                </Actions>
              </Collapsible>
            </li>
          ))}
        </List>
      ) : (
        <Typography variant="h2">
          Não existem séries cadastradas ainda
        </Typography>
      )}
    </Section>
  );
};

export default Books;
