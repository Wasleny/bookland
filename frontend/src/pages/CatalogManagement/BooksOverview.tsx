import OverviewCard from "../../components/OverviewCard";
import { StyledSection } from "./styles";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useBooks } from "../../hooks/useBooks";
import { FaBook } from "react-icons/fa";
import BooksModal from "../../components/BooksModal";

const BooksOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { books, isLoading } = useBooks();
  const navigate = useNavigate();

  return isLoading ? (
    <>Carregando...</>
  ) : (
    <>
      <BooksModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <StyledSection>
        <OverviewCard
          title={
            <>
              <FaBook /> Total de livros
            </>
          }
          amount={books?.length ?? 0}
        >
          <Button variant="submit" onClick={() => setIsModalOpen(true)}>
            Cadastrar novo livro
          </Button>
          <Button variant="show" onClick={() => navigate("/admin/books")}>
            Ver todos os livros
          </Button>
        </OverviewCard>
      </StyledSection>
    </>
  );
};

export default BooksOverview;
