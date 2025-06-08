import { useNavigate } from "react-router";
import type { ReviewProps } from "../../../types/review";
import Button from "../../Button";
import Cover from "../../Cover";
import Typography from "../../Typography";
import { ReadingCard, StyledReadings } from "./styles";
import Progress from "./Progress";

interface ReadingsProps {
  userCurrentReadings: ReviewProps[];
  handleUpdate: (bookId: string, bookTitle: string) => void;
}

const Readings = ({ userCurrentReadings, handleUpdate }: ReadingsProps) => {
  const navigate = useNavigate();

  return (
    <StyledReadings>
      {userCurrentReadings.map((item) => (
        <ReadingCard
          alignItems="center"
          gap="md"
          verticalPadding="xl"
          horizontalPadding="xl"
          key={item.book.title}
          title={item.book.title}
        >
          <Cover
            onClick={() => navigate(`/book/${item.book.id}`)}
            path={item.book.cover}
            size="sm"
            alt={`Capa do livro ${item.book.title}`}
          />
          <Typography
            variant="h3"
            marginBottom="none"
            marginEnd="none"
            marginStart="none"
            marginTop="none"
          >
            {item.book.title}
          </Typography>
          <Typography
            variant="h4"
            marginBottom="none"
            marginEnd="none"
            marginStart="none"
            marginTop="none"
          >
            {item.book.authors}
          </Typography>
          <Progress progress={item.progress ?? 0} />
          <Button
            variant="edit"
            onClick={() => handleUpdate(item.book.id, item.book.title)}
          >
            Atualizar Progresso
          </Button>
        </ReadingCard>
      ))}
    </StyledReadings>
  );
};

export default Readings;
