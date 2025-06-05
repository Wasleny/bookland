import type { Width } from "../../types/common";
import { StyledAvatar } from "./styles";

interface AvatarProps {
  path: string;
  size?: Width;
}

const Avatar = ({ path, size = "elementSm" }: AvatarProps) => {
  return <StyledAvatar size={size} src={path} alt="Avatar do usuário" />;
};

export default Avatar;
