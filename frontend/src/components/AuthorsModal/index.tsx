import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { useAuthors } from "../../hooks/useAuthors";
import Modal from "../Modal";
import Typography from "../Typography";
import Input from "../Form/Input";
import { FormActions } from "../../pages/CatalogManagement/styles";
import Button from "../Button";

interface AuthorsModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isUpdating?: boolean;
  setIsUpdating?: Dispatch<SetStateAction<boolean>>;
  authorId?: string;
}

const AuthorsModal = ({
  setIsOpen,
  isOpen,
  isUpdating = false,
  setIsUpdating = () => {},
  authorId,
}: AuthorsModalProps) => {
  const [authorName, setAuthorName] = useState("");
  const [nationality, setNationality] = useState("");
  const { addAuthor, updateAuthor, getAuthor } = useAuthors();

  useEffect(() => {
    if (isUpdating && authorId) {
      const recoveredAuthor = getAuthor(authorId);
      setAuthorName(recoveredAuthor?.name ?? "");
      setNationality(recoveredAuthor?.nationality ?? "");
    }
  }, [isUpdating, authorId, getAuthor]);

  const handleClose = () => {
    setIsOpen(false);
    setAuthorName("");
    setNationality("");
    setIsUpdating(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (isUpdating) {
        if (!authorId) return;
        await updateAuthor(authorId, {
          name: authorName,
          nationality: nationality,
        });

        setIsUpdating(false);
      } else {
        await addAuthor({ name: authorName, nationality: nationality });
      }

      handleClose();
    } catch (error) {
      console.log("Erro ao executar solicitação", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={onSubmit}>
        <Typography variant="h2">
          {isUpdating ? "Edite um autor" : "Cadastre um autor"}
        </Typography>
        <Input
          id="name"
          label="Nome do(a) Autor(a)"
          onChange={(e) => setAuthorName(e.target.value)}
          type="text"
          value={authorName}
        />
        <Input
          id="nationality"
          label="Nacionalidade"
          onChange={(e) => setNationality(e.target.value)}
          type="text"
          value={nationality}
        />
        <FormActions>
          <Button variant="remove" type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="submit" type="submit">
            Criar
          </Button>
        </FormActions>
      </form>
    </Modal>
  );
};

export default AuthorsModal;
