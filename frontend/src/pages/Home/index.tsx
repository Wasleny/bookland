import Typography from "../../components/Typography";
import { useAuth } from "../../hooks/useAuth";
import AuthenticatedHome from "./AuthenticatedHome";
import VisitorHome from "./VisitorHome";

const Home = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <Typography variant="body">Loading...</Typography>;

  return currentUser ? <AuthenticatedHome /> : <VisitorHome />; 
};

export default Home;
