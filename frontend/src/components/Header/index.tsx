import { useAuth } from "../../hooks/useAuth";
import AuthenticatedHeader from "./AuthenticatedHeader";
import VisitorHeader from "./VisitorHeader";

const Header = () => {
  const { currentUser } = useAuth();
  
  return currentUser ? (
    <AuthenticatedHeader currentUser={currentUser} />
  ) : (
    <VisitorHeader />
  );
};

export default Header;
