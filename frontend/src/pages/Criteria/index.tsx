import { useEffect, useState, type FormEvent } from "react";
import SearchForm from "../../components/Form/SearchForm";
import type { RatingCriteria } from "../../types/ratingCriteria";
import Typography from "../../components/Typography";
import { StyledCriteria, StyledForm, StyledSection } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import Card from "../../components/Card";
import { ratingCriteria } from "../../mocks/mockRatingCriteria";
import { useAuth } from "../../hooks/useAuth";
import { ErrorMessage } from "../styles";
import { normalizeText } from "../../utils/normalizeText";

const Criteria = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [criteria, setCriteria] = useState<RatingCriteria[]>([]);
  const [results, setResults] = useState<RatingCriteria[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState("");
  const { currentUser } = useAuth();
  const user = currentUser?.id;

  useEffect(() => {
    setCriteria(ratingCriteria.filter((criteria) => user === criteria.userId));
  }, [user]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!name || !description)
        throw new Error("Todos os campos são obrigatórios.");

      if (!user) return;

      if (!isUpdating) {
        const newCriterion = {
          id: `criteria-${ratingCriteria.length + 1}`,
          name,
          description,
          userId: user,
        };
        setCriteria([...criteria, newCriterion]);
      } else {
        setCriteria(
          criteria.map((criterion) => {
            if (criterion.id === isUpdating) {
              return { ...criterion, name, description };
            }

            return criterion;
          })
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login");
      return;
    }

    handleCloseForm()
  };

  const handleUpdate = (id: string) => {
    const criterion = criteria.filter((criterion) => criterion.id === id)[0];

    setFormIsOpen(true);
    setIsUpdating(id);
    setName(criterion.name);
    setDescription(criterion.description);
  };

  const onDelete = (id: string) => {
    setCriteria(criteria.filter((criterion) => criterion.id !== id));
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const normalizedTitle = normalizeText(search);

    setResults(
      criteria.filter((criterion) => {
        const normalizedName = normalizeText(criterion.name);
        return normalizedName.includes(normalizedTitle);
      })
    );
    setSearch("");
  };

  const handleCloseForm = () => {
    setFormIsOpen(false);
    setName("");
    setDescription("");
    setIsUpdating("");
    setError("");
  };

  return (
    <>
      <SearchForm
        onSubmit={onSearch}
        placeholder="Procurar por critérios"
        search={search}
        setSearch={setSearch}
      />

      <StyledSection>
        {results.length > 0 && (
          <>
            <Button variant="outline" onClick={() => setResults([])}>
              Limpar pesquisa
            </Button>
            <StyledCriteria>
              {results.map((result) => (
                <Card breakpoint="lg" key={result.id}>
                  <Typography variant="h2">{result.name}</Typography>
                  <Typography variant="bodyItalic">
                    {result.description}
                  </Typography>

                  <footer>
                    <Button
                      variant="remove"
                      onClick={() => onDelete(result.id)}
                    >
                      Excluir Critéria
                    </Button>
                    <Button
                      variant="edit"
                      onClick={() => handleUpdate(result.id)}
                    >
                      Editar Critéria
                    </Button>
                  </footer>
                </Card>
              ))}
            </StyledCriteria>
          </>
        )}

        <div>
          <Typography variant="h1">Critérios de Avaliação</Typography>
          <Button variant="submit" onClick={() => setFormIsOpen(true)}>
            Criar Critério
          </Button>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {formIsOpen && (
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
              <Button variant="remove" onClick={handleCloseForm}>
                Cancelar
              </Button>

              <Button variant="submit" type="submit">
                {isUpdating ? "Salvar" : "Criar"}
              </Button>
            </div>
          </StyledForm>
        )}

        <StyledCriteria>
          {criteria.map((criterion) => (
            <Card breakpoint="lg" key={criterion.id}>
              <Typography variant="h2">{criterion.name}</Typography>
              <Typography variant="bodyItalic">
                {criterion.description}
              </Typography>

              <footer>
                <Button variant="remove" onClick={() => onDelete(criterion.id)}>
                  Excluir Critéria
                </Button>
                <Button
                  variant="edit"
                  onClick={() => handleUpdate(criterion.id)}
                >
                  Editar Critéria
                </Button>
              </footer>
            </Card>
          ))}
        </StyledCriteria>
      </StyledSection>
    </>
  );
};

export default Criteria;
