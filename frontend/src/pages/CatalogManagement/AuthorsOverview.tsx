import OverviewCard from "../../components/OverviewCard";
import { StyledSection } from "./styles";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BsFilePersonFill } from "react-icons/bs";
import { useAuthors } from "../../hooks/useAuthors";
import AuthorsModal from "../../components/AuthorsModal";

const AuthorsOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authors, isLoading } = useAuthors();
  const navigate = useNavigate();

  return isLoading ? (
    <>Carregando...</>
  ) : (
    <>
      <AuthorsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <StyledSection>
        <OverviewCard
          title={
            <>
              <BsFilePersonFill /> Total de Autores
            </>
          }
          amount={authors?.length ?? 0}
        >
          <Button variant="submit" onClick={() => setIsModalOpen(true)}>Cadastrar novo autor</Button>
          <Button variant="show" onClick={() => navigate('/admin/authors')}>Ver todos os autores</Button>
        </OverviewCard>
      </StyledSection>
    </>
  );
};

export default AuthorsOverview;
