import Typography from "../../../Typography";
import { ProgressFill, ProgressTrack, ProgressWrapper } from "./styles";

interface ProgressProps {
    progress: number;
}

const Progress = ({ progress }: ProgressProps) => {
  return (
    <ProgressWrapper>
      <ProgressTrack>
        <ProgressFill progress={progress} />
      </ProgressTrack>
      <Typography variant="body">{progress}%</Typography>
    </ProgressWrapper>
  );
};

export default Progress;
