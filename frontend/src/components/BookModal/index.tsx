import Button from "../Button";
import Modal from "../Modal";
import Typography from "../Typography";
import type { Status } from "../../types/common";

interface BookModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onUpdate: (status: Status) => void;
}

const BookModal = ({ isModalOpen, onClose, onUpdate }: BookModalProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <Typography variant="h2">Adicionar à Biblioteca</Typography>
      <section className="options">
        <Button
          color="primary"
          variant="outline"
          onClick={() => onUpdate("read")}
        >
          Lido
        </Button>
        <Button
          color="secondary"
          variant="outline"
          onClick={() => onUpdate("to read")}
        >
          Quero Ler
        </Button>
        <Button
          color="accent"
          variant="outline"
          onClick={() => onUpdate("reading")}
        >
          Lendo
        </Button>
        <Typography variant="body" onClick={() => onUpdate("not added")}>
          Remover da biblioteca
        </Typography>
      </section>
    </Modal>
  );
};

export default BookModal;
