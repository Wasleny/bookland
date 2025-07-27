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
import { genders } from "../../constants/gender";

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
              <Typography variant="body">{`${currentUser?.ratingsCount} avaliações - média de ${currentUser?.averageRating} estrelas`}</Typography>
              <Typography variant="body">
                {currentUser?.reviewsCount} resenhas
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
                <dd>
                  {currentUser?.age ? `${currentUser?.age} anos, ` : ""}{" "}
                  {genders[currentUser?.gender ?? "unspecified"]}
                </dd>
              </Row>
              <Row>
                <dt>Aniversário</dt>
                <dd>
                  {currentUser?.birthdate
                    ? currentUser?.birthdate.toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </dd>
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
