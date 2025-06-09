import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { FormDataProps } from "../Collapsible";
import Typography from "../../Typography";
import Card from "../../Card";
import DatePeriod from "./DatePeriod";
import { Actions, StyledForm } from "./styles";
import Review from "./Review";
import Button from "../../Button";
import Criteria from "./Criteria";

interface RatingBookFormProps {
  isOpen: boolean;
  onSubmit: (e: FormEvent) => void;
  formData: FormDataProps;
  setFormData: Dispatch<SetStateAction<FormDataProps>>;
  handleCancel: () => void;
}

const RatingBookForm = ({
  isOpen,
  handleCancel,
  formData,
  onSubmit,
  setFormData,
}: RatingBookFormProps) => {
  return (
    isOpen && (
      <Card width="full">
        <StyledForm onSubmit={onSubmit}>
          <Typography
            variant="h2"
            marginStart="none"
            marginTop="none"
            marginEnd="none"
          >
            Cadastro de leitura
          </Typography>
          <DatePeriod formData={formData} setFormData={setFormData} />
          <Review formData={formData} setFormData={setFormData} />
          <Criteria formData={formData} setFormData={setFormData} />
          <Actions>
            <Button type="button" variant="remove" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="submit">
              Salvar Leitura
            </Button>
          </Actions>
        </StyledForm>
      </Card>
    )
  );
};

export default RatingBookForm;
