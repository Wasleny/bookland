import type { FormEvent } from "react";
import Button from "../../Button";
import ErrorMessage from "../../ErrorMessage";
import Input from "../../Form/Input";
import Modal from "../../Modal";
import Typography from "../../Typography";
import { UpdateProgressForm } from "./styles";

interface ModalUpdateProgressProps {
  modalIsOpen: boolean;
  onClose: () => void;
  title: string;
  setNewProgress: (value: string) => void;
  onUpdate: (e: FormEvent) => void;
  newProgress: string;
  error: string;
}

const ModalUpdateProgress = ({
  modalIsOpen,
  onClose,
  onUpdate,
  setNewProgress,
  title,
  newProgress,
  error,
}: ModalUpdateProgressProps) => {
  return (
    <Modal isOpen={modalIsOpen} onClose={onClose}>
      <ErrorMessage error={error} />
      <UpdateProgressForm onSubmit={onUpdate}>
        <Typography variant="h2">{title}</Typography>
        <Input
          id="update-progress"
          label="Progresso"
          onChange={(e) => setNewProgress(e.target.value)}
          type="number"
          value={newProgress}
        />
        <Button variant="submit" type="submit">
          Atualizar
        </Button>
      </UpdateProgressForm>
    </Modal>
  );
};

export default ModalUpdateProgress;
