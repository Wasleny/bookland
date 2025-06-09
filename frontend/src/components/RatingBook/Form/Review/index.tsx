import {
  useEffect,
  useRef,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { FormDataProps } from "../../Collapsible";
import {
  GroupForm,
  Row,
  StyledDiv,
  StyledLabel,
  StyledTextarea,
} from "../styles";

interface ReviewProps {
  formData: FormDataProps;
  setFormData: Dispatch<SetStateAction<FormDataProps>>;
}

const Review = ({ formData, setFormData }: ReviewProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

   useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <StyledDiv>
      <StyledLabel>Resenha</StyledLabel>
      <StyledTextarea
        ref={textareaRef}
        rows={10}
        value={formData.body}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setFormData((prev) => ({
            ...prev,
            body: e.target.value,
          }))
        }
      />
      <Row>
        <GroupForm>
          <input
            type="checkbox"
            name="spoilers"
            id="spoilers"
            checked={formData.spoiler}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({
                ...prev,
                spoiler: e.target.checked,
              }))
            }
          />
          <label htmlFor="spoilers">Minha resenha possui spoilers</label>
        </GroupForm>
      </Row>
    </StyledDiv>
  );
};

export default Review;
