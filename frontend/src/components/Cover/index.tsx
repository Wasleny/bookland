import type { Width } from "../../types/common";
import { StyledCover } from "./styles";

interface CoverProps {
    path: string;
    alt: string;
    size: Width;
    onClick?: () => void
    title?: string
}

const Cover = ({ path, alt, size, onClick, title='' }: CoverProps) => {
    return <StyledCover title={title} onClick={onClick} size={size} src={path} alt={alt} />
}

export default Cover