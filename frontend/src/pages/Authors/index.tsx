import { useState } from "react";
import Section from "../../components/Section";
import Typography from "../../components/Typography";
import { MdEditSquare } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { Actions, Div, Table } from "./styles";
import Button from "../../components/Button";
import { useAuthors } from "../../hooks/useAuthors";
import AuthorsModal from "../../components/AuthorsModal";

const Authors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [author, setAuthor] = useState("");
  const { authors, isLoading, deleteAuthor } = useAuthors();

  const handleUpdate = (id: string) => {
    setAuthor(id);
    setIsModalOpen(true);
    setIsUpdating(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAuthor(id);
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  };

  return isLoading ? (
    <Typography variant="body">Carregando...</Typography>
  ) : (
    <Section>
      <Div>
        <Typography variant="h1">Autores Cadastrados</Typography>
        <Button variant="submit" onClick={() => setIsModalOpen(true)}>
          Cadastrar autor
        </Button>
      </Div>
      <AuthorsModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        authorId={author}
      />

      {authors && authors.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Autores</th>
              <th>Nacionalidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{author.name}</td>
                <td>{author.nationality}</td>
                <Actions>
                  <MdEditSquare
                    size={30}
                    onClick={() => handleUpdate(author.id)}
                  />
                  <IoTrashBin
                    size={30}
                    onClick={() => handleDelete(author.id)}
                  />
                </Actions>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Typography variant="h2">
          Não existem autores cadastrados ainda
        </Typography>
      )}
    </Section>
  );
};

export default Authors;
