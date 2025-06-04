import { Outlet } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { StyledLayout } from "./styles";

const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <Outlet />
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
