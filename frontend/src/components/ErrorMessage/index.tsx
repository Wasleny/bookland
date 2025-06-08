import { StyledErrorMessage } from "./styles";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return error && <StyledErrorMessage>{error}</StyledErrorMessage>;
};

export default ErrorMessage;
