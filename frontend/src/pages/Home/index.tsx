import { useAuth } from "../../hooks/useAuth";
import AuthenticatedHome from "./AuthenticatedHome";
import VisitorHome from "./VisitorHome";

const Home = () => {
  const { currentUser } = useAuth();

  return currentUser ? <AuthenticatedHome /> : <VisitorHome />;
};

export default Home;
