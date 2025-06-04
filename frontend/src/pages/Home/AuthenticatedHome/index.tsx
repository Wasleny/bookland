import { StyledSection } from "../styles";
import Banner from "../../../components/Banner";
import AsideMenu from "../../../components/AsideMenu";
import CurrentReadings from "../../../components/CurrentReadings";

const AuthenticatedHome = () => {
  return (
    <>
      <Banner />
      <StyledSection>
        <AsideMenu />
        <CurrentReadings />
      </StyledSection>
    </>
  );
};

export default AuthenticatedHome;
