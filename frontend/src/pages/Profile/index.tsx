import AsideMenu from "../../components/AsideMenu";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Shelves from "../../components/Shelves";
import Typography from "../../components/Typography";
import { useAuth } from "../../hooks/useAuth";
import { StyledSection } from "../Home/styles";
import {
  Dl,
  GeneralInfo,
  ProfileHeader,
  Row,
  SpecificInfo,
  Stats,
  StyledProfile,
} from "./styles";

const Profile = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <StyledSection>
        <AsideMenu />
        <StyledProfile>
          <GeneralInfo>
            <Avatar size="elementXl" path={currentUser?.avatarUrl ?? ""} />
            <Stats>
              <Typography variant="body">{`${currentUser?.ratingCount} avaliações - média de ${currentUser?.averageRating} estrelas`}</Typography>
              <Typography variant="body">
                {currentUser?.reviewCount} resenhas
              </Typography>
            </Stats>
          </GeneralInfo>
          <SpecificInfo>
            <ProfileHeader>
              <Typography variant="title">{currentUser?.name}</Typography>
              <Button variant="edit">Editar Perfil</Button>
            </ProfileHeader>
            <Dl>
              <Row>
                <dt>Detalhes</dt>
                <dd>30 anos, mulher</dd>
              </Row>
              <Row>
                <dt>Aniversário</dt>
                <dd>01 de janeiro de 1995</dd>
              </Row>
            </Dl>
            <Shelves />
          </SpecificInfo>
        </StyledProfile>
      </StyledSection>
    </>
  );
};

export default Profile;
