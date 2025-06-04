import type { Width } from "../../types/common";
import { StyledCover } from "./styles";

interface CoverProps {
    path: string;
    alt: string;
    size: Width;
    onClick?: () => void
}

const Cover = ({ path, alt, size, onClick }: CoverProps) => {
    return <StyledCover onClick={onClick} size={size} src={path} alt={alt} />
}

export default Cover