import type { RatingCriteria } from "../../types/ratingCriteria";
import Button from "../Button";
import Card from "../Card";
import Typography from "../Typography";
import { FooterCard } from "./styles";

interface CriterionProps {
  criterion: RatingCriteria;
  onDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
}

const Criterion = ({ criterion, handleUpdate, onDelete }: CriterionProps) => {
  return (
    <Card breakpoint="lg" key={criterion.id} gap="lg" width='full'>
      <Typography
        variant="h2"
        marginBottom="none"
        marginEnd="none"
        marginStart="none"
        marginTop="sm"
      >
        {criterion.name}
      </Typography>
      <Typography variant="bodyItalic">{criterion.description}</Typography>

      <FooterCard>
        <Button variant="remove" onClick={() => onDelete(criterion.id)}>
          Excluir Critério
        </Button>
        <Button variant="edit" onClick={() => handleUpdate(criterion.id)}>
          Editar Critério
        </Button>
      </FooterCard>
    </Card>
  );
};

export default Criterion;
