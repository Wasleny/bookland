import type { RatingCriteria } from "../../types/ratingCriteria";
import Button from "../Button";
import Typography from "../Typography";
import { CriterionCard } from "./styles";

interface CriterionProps {
  criterion: RatingCriteria;
  onDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
}

const Criterion = ({ criterion, handleUpdate, onDelete }: CriterionProps) => {
  return (
    <CriterionCard breakpoint="lg" key={criterion.id}>
      <Typography variant="h2">{criterion.name}</Typography>
      <Typography variant="bodyItalic">{criterion.description}</Typography>

      <footer>
        <Button variant="remove" onClick={() => onDelete(criterion.id)}>
          Excluir Critéria
        </Button>
        <Button variant="edit" onClick={() => handleUpdate(criterion.id)}>
          Editar Critéria
        </Button>
      </footer>
    </CriterionCard>
  );
};

export default Criterion;
