import type { FormEvent } from "react";
import Modal from "../Modal";
import { StyledForm } from "./styles";
import Input from "../Form/Input";
import Button from "../Button";
import Typography from "../Typography";

interface CriterionModalProps {
  isModalOpen: boolean;
  isUpdating: string;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  name: string;
  description: string;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
}

const CriterionModal = ({
  isModalOpen,
  isUpdating,
  onClose,
  onSubmit,
  name,
  description,
  setName,
  setDescription,
}: CriterionModalProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <Typography variant="h2">Crie um novo critério</Typography>
      <StyledForm onSubmit={onSubmit}>
        <Input
          id="title"
          label="Nome do critério"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
        />

        <Input
          id="description"
          label="Descrição do critério"
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          value={description}
        />

        <div>
          <Button variant="remove" onClick={onClose}>
            Cancelar
          </Button>

          <Button variant="submit" type="submit">
            {isUpdating ? "Salvar" : "Criar"}
          </Button>
        </div>
      </StyledForm>
    </Modal>
  );
};

export default CriterionModal;
