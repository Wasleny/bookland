import { Tooltip } from "react-tooltip";
import type { Rating } from "../../../../types/common";
import type { RatedCriterionProps } from "../../../../types/ratingCriteria";
import Collapsible from "../../../Collapsible";
import {
  CriteriaContainer,
  CriterionContainer,
  StyledDd,
  StyledDl,
  StyledDt,
} from "./styles";
import { PiQuestion } from "react-icons/pi";

interface BookCriteriaProps {
  composition: RatedCriterionProps[];
  independent: RatedCriterionProps[];
  rating: Rating | "0";
}

const BookCriteria = ({
  composition,
  independent,
  rating,
}: BookCriteriaProps) => {
  return (
    <CriteriaContainer>
      {composition.length > 0 && (
        <Collapsible
          hasButton={false}
          title="CRITÉRIOS DE COMPOSIÇÃO DA AVALIAÇÃO"
          variantTitle="h4"
        >
          <StyledDl>
            {composition.map((criterion, index) => (
              <CriterionContainer key={index}>
                <StyledDt>{criterion.criterion.name} </StyledDt>
                <StyledDd>{criterion.rating}</StyledDd>
              </CriterionContainer>
            ))}
            <CriterionContainer>
              <StyledDt>
                <strong>
                  Avaliação Final
                  <PiQuestion size={25} className="final-rating" />
                </strong>
              </StyledDt>
              <StyledDd>
                <strong>{rating}</strong>
              </StyledDd>
            </CriterionContainer>
          </StyledDl>
        </Collapsible>
      )}

      {independent.length > 0 && (
        <Collapsible
          hasButton={false}
          title="CRITÉRIOS DE AVALIAÇÃO INDEPENDENTES"
          variantTitle="h4"
        >
          <StyledDl>
            {independent.map((criterion, index) => (
              <CriterionContainer key={index}>
                <StyledDt>{criterion.criterion.name}</StyledDt>
                <StyledDd>{criterion.rating}</StyledDd>
              </CriterionContainer>
            ))}
          </StyledDl>
        </Collapsible>
      )}

      <Tooltip style={{width: '250px'}} anchorSelect=".final-rating" place="top" >
        Essa leitura foi avaliada utilizando os critérios de composição, ou
        seja, a avaliação final é a média arredondada dos critérios
      </Tooltip>
    </CriteriaContainer>
  );
};

export default BookCriteria;
