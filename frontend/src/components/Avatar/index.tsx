import { StyledAvatar } from "./styles";

interface AvatarProps {
  path: string;
}

const Avatar = ({ path }: AvatarProps) => {
  return <StyledAvatar src={path} alt="Avatar do usuário" />;
};

export default Avatar;
