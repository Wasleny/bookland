import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { FormDataProps } from "../../Collapsible";
import { useAuth } from "../../../../hooks/useAuth";
import type { Rating } from "../../../../types/common";
import { Col, GroupForm, Row, StyledLabel } from "../styles";
import { StyledSelect } from "../Select/styles";
import {
  AddCriterionButton,
  CriteriaList,
  CriteriaListItem,
  Div,
  SelectGroup,
  Switch,
  SwitchContainer,
} from "./styles";
import Typography from "../../../Typography";
import { TbTrashX } from "react-icons/tb";
import type { RatingCriteriaProps } from "../../../../types/ratingCriteria";
import { mockRatingCriteria } from "../../../../mocks/mockRatingCriteria";

interface CriteriaProps {
  formData: FormDataProps;
  setFormData: Dispatch<SetStateAction<FormDataProps>>;
}

const Criteria = ({ formData, setFormData }: CriteriaProps) => {
  const [availableCriteria, setAvailableCriteria] = useState<
    RatingCriteriaProps[]
  >([]);
  const [selectedCompositionCriterion, setSelectedCompositionCriterion] =
    useState<RatingCriteriaProps | undefined>(undefined);
  const [selectedIndependentCriterion, setSelectedIndependentCriterion] =
    useState<RatingCriteriaProps | undefined>(undefined);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    setAvailableCriteria(
      mockRatingCriteria.filter((c) => c.userId === currentUser.id)
    );
  }, [currentUser]);

  useEffect(() => {
    if (!formData.useCompositionCriteria) return;

    const ratings = formData.ratingCompositionCriteria
      .map((c) => c.rating)
      .filter((r): r is Rating => r !== null);

    if (ratings.length === 0) {
      setFormData((prev) => ({
        ...prev,
        rating: undefined,
      }));
      return;
    }

    const average = Math.round(
      ratings.reduce((acc, val) => acc + val, 0) / ratings.length
    ) as Rating;

    setFormData((prev) => ({
      ...prev,
      rating: average,
    }));
  }, [
    formData.ratingCompositionCriteria,
    formData.useCompositionCriteria,
    setFormData,
  ]);

  const addCompositionCriterion = () => {
    if (!selectedCompositionCriterion) return;

    const existsInComposition = formData.ratingCompositionCriteria.some(
      (c) => c.criterion.id === selectedCompositionCriterion.id
    );

    const existsInIndependent = formData.independentRatingCriteria.some(
      (c) => c.criterion.id === selectedCompositionCriterion.id
    );

    if (existsInComposition || existsInIndependent) return;

    setFormData((prev) => ({
      ...prev,
      ratingCompositionCriteria: [
        ...prev.ratingCompositionCriteria,
        { criterion: selectedCompositionCriterion, rating: null },
      ],
    }));
  };

  const removeCompositionCriterion = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      ratingCompositionCriteria: [
        ...prev.ratingCompositionCriteria.filter((c) => c.criterion.id !== id),
      ],
    }));
  };

  const addIndependentCriterion = () => {
    if (!selectedIndependentCriterion) return;

    const existsInComposition = formData.ratingCompositionCriteria.some(
      (c) => c.criterion.id === selectedIndependentCriterion.id
    );

    const existsInIndependent = formData.independentRatingCriteria.some(
      (c) => c.criterion.id === selectedIndependentCriterion.id
    );

    if (existsInComposition || existsInIndependent) return;

    setFormData((prev) => ({
      ...prev,
      independentRatingCriteria: [
        ...prev.independentRatingCriteria,
        { criterion: selectedIndependentCriterion, rating: null },
      ],
    }));
  };

  const removeIndependentCriterion = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      independentRatingCriteria: [
        ...prev.independentRatingCriteria.filter((c) => c.criterion.id !== id),
      ],
    }));
  };

  const handleUseCompositionCriteria = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      useCompositionCriteria: e.target.checked,
    }));

    if (formData.useCompositionCriteria) {
      setFormData((prev) => ({
        ...prev,
        rating: undefined,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        ratingCompositionCriteria: [],
      }));
    }
  };

  const handleUseIndependentCriteria = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      useIndependentCriteria: e.target.checked,
    }));

    if (!formData.useCompositionCriteria) {
      setFormData((prev) => ({
        ...prev,
        independentRatingCriteria: [],
      }));
    }
  };

  return (
    <Row flexColumn>
      <Col>
        <GroupForm>
          <Div>
            <SwitchContainer>
              <Switch htmlFor="useratingCompositionCriteria">
                <input
                  type="checkbox"
                  name="useratingCompositionCriteria"
                  id="useratingCompositionCriteria"
                  checked={formData.useCompositionCriteria}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleUseCompositionCriteria(e)
                  }
                />
                <span></span>
              </Switch>
              <span>Usar Critérios de Composição de Avaliação</span>
            </SwitchContainer>
          </Div>
        </GroupForm>

        {formData.useCompositionCriteria ? (
          <>
            <SelectGroup>
              <StyledSelect
                value={selectedCompositionCriterion?.id ?? ""}
                onChange={(e) => {
                  const found = availableCriteria.find(
                    (c) => c.id === e.target.value
                  );
                  if (found) {
                    setSelectedCompositionCriterion(found);
                  }
                }}
              >
                <option value="">Selecione um critério</option>
                {availableCriteria.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </StyledSelect>

              <AddCriterionButton
                type="button"
                onClick={() => addCompositionCriterion()}
              >
                ADICIONAR CRITÉRIO
              </AddCriterionButton>
            </SelectGroup>

            <CriteriaList>
              {formData.ratingCompositionCriteria.map((c, index) => (
                <CriteriaListItem key={index}>
                  <Typography variant="body">
                    {c.criterion?.name ?? "Critério inválido"}
                  </Typography>

                  <StyledSelect
                    value={c.rating ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      const rating =
                        value === "" ? null : (parseInt(value) as Rating);

                      setFormData((prev) => {
                        const updated = [...prev.ratingCompositionCriteria];
                        updated[index] = {
                          ...updated[index],
                          rating: rating,
                        };
                        return {
                          ...prev,
                          ratingCompositionCriteria: updated,
                        };
                      });
                    }}
                  >
                    <option value="">Nota</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </StyledSelect>
                  <TbTrashX
                    size={20}
                    onClick={() => removeCompositionCriterion(c.criterion.id)}
                  />
                </CriteriaListItem>
              ))}
            </CriteriaList>
            <Typography variant="body">Média: {formData.rating}</Typography>
          </>
        ) : (
          <GroupForm>
            <StyledLabel>Avaliação</StyledLabel>
            <StyledSelect
              value={formData.rating ?? ""}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  rating:
                    e.target.value !== ""
                      ? (parseInt(e.target.value) as Rating)
                      : undefined,
                }))
              }
            >
              <option value="">Nota</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </StyledSelect>
          </GroupForm>
        )}
      </Col>

      <Col>
        <GroupForm>
          <Div>
            <SwitchContainer>
              <Switch htmlFor="useIndependentCriteria">
                <input
                  type="checkbox"
                  name="useIndependentCriteria"
                  id="useIndependentCriteria"
                  checked={formData.useIndependentCriteria}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleUseIndependentCriteria(e)
                  }
                />
                <span></span>
              </Switch>
              <span>Usar Critérios de Avaliação Independentes</span>
            </SwitchContainer>
          </Div>
        </GroupForm>

        {formData.useIndependentCriteria && (
          <>
            <SelectGroup>
              <StyledSelect
                value={selectedIndependentCriterion?.id ?? ""}
                onChange={(e) => {
                  const found = availableCriteria.find(
                    (c) => c.id === e.target.value
                  );
                  if (found) {
                    setSelectedIndependentCriterion(found);
                  }
                }}
              >
                <option value="">Selecione um critério</option>
                {availableCriteria.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </StyledSelect>

              <AddCriterionButton
                type="button"
                onClick={() => addIndependentCriterion()}
              >
                ADICIONAR CRITÉRIO
              </AddCriterionButton>
            </SelectGroup>

            <CriteriaList>
              {formData.independentRatingCriteria.map((c, index) => (
                <CriteriaListItem key={index}>
                  <Typography variant="body">
                    {c.criterion?.name ?? "Critério inválido"}
                  </Typography>

                  <StyledSelect
                    value={c.rating ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      const rating =
                        value === "" ? null : (parseInt(value) as Rating);

                      setFormData((prev) => {
                        const updated = [...prev.independentRatingCriteria];
                        updated[index] = {
                          ...updated[index],
                          rating: rating,
                        };
                        return {
                          ...prev,
                          independentRatingCriteria: updated,
                        };
                      });
                    }}
                  >
                    <option value="">Nota</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </StyledSelect>
                  <TbTrashX
                    size={20}
                    onClick={() => removeIndependentCriterion(c.criterion.id)}
                  />
                </CriteriaListItem>
              ))}
            </CriteriaList>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Criteria;
