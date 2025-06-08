import { useEffect, useState, type FormEvent } from "react";
import SearchForm from "../../components/Form/SearchForm";
import type { RatingCriteria } from "../../types/ratingCriteria";
import Typography from "../../components/Typography";
import { StyledCriteria, StyledSection } from "./styles";
import Button from "../../components/Button";
import { ratingCriteria } from "../../mocks/mockRatingCriteria";
import { useAuth } from "../../hooks/useAuth";
import { normalizeText } from "../../utils/normalizeText";
import CriterionModal from "../../components/CriterionModal";
import Criterion from "../../components/Criterion";

const Criteria = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [criteria, setCriteria] = useState<RatingCriteria[]>([]);
  const [results, setResults] = useState<RatingCriteria[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setError(err instanceof Error ? err.message : "Falha no cadastro");
      return;
    }

    handleCloseModal();
  };

  const handleUpdate = (id: string) => {
    const criterion = criteria.filter((criterion) => criterion.id === id)[0];

    setIsModalOpen(true);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                <Criterion
                  key={result.id}
                  criterion={result}
                  handleUpdate={handleUpdate}
                  onDelete={onDelete}
                />
              ))}
            </StyledCriteria>
          </>
        )}

        <div>
          <Typography variant="h1">Critérios de Avaliação</Typography>
          <Button variant="submit" onClick={() => setIsModalOpen(true)}>
            Criar Critério
          </Button>
        </div>

        <CriterionModal
          description={description}
          isModalOpen={isModalOpen}
          isUpdating={isUpdating}
          name={name}
          onClose={handleCloseModal}
          onSubmit={onSubmit}
          setDescription={setDescription}
          setName={setName}
          error={error}
        />

        <StyledCriteria>
          {criteria.map((criterion) => (
            <Criterion
              key={criterion.id}
              criterion={criterion}
              handleUpdate={handleUpdate}
              onDelete={onDelete}
            />
          ))}
        </StyledCriteria>
      </StyledSection>
    </>
  );
};

export default Criteria;
