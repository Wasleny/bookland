import type { Bookshelf } from "../../types/common";
import Button from "../Button";
import Modal from "../Modal";
import Typography from "../Typography";

interface BookModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onUpdate: (bookshelf: Bookshelf) => void;
}

const BookModal = ({ isModalOpen, onClose, onUpdate }: BookModalProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <Typography variant="h2">Adicionar à Biblioteca</Typography>
      <section className="options">
        <Button
          dataTestId="button-update-bookshelf-read"
          color="primary"
          variant="outline"
          onClick={() => onUpdate("read")}
        >
          Lido
        </Button>
        <Button
          dataTestId="button-update-bookshelf-want-to-read"
          color="secondary"
          variant="outline"
          onClick={() => onUpdate("want to read")}
        >
          Quero Ler
        </Button>
        <Button
          dataTestId="button-update-bookshelf-reading"
          color="accent"
          variant="outline"
          onClick={() => onUpdate("reading")}
        >
          Lendo
        </Button>
      </section>
    </Modal>
  );
};

export default BookModal;
