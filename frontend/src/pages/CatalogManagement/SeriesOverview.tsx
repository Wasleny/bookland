import { RiBookShelfFill } from "react-icons/ri";
import OverviewCard from "../../components/OverviewCard";
import SeriesModal from "../../components/SeriesModal";
import { StyledSection } from "./styles";
import Button from "../../components/Button";
import { useState } from "react";
import { useSeries } from "../../hooks/useSeries";
import { useNavigate } from "react-router";

const SeriesOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allSeries, isLoading } = useSeries();
  const navigate = useNavigate();

  return isLoading ? (
    <>Carregando...</>
  ) : (
    <>
      <SeriesModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <StyledSection>
        <OverviewCard
          title={
            <>
              <RiBookShelfFill size={35} /> Total de séries
            </>
          }
          amount={allSeries?.length ?? 0}
        >
          <Button variant="submit" onClick={() => setIsModalOpen(true)}>
            Cadastrar nova série
          </Button>
          <Button variant="show" onClick={() => navigate("/admin/series")}>
            Ver todas as séries
          </Button>
        </OverviewCard>
      </StyledSection>
    </>
  );
};

export default SeriesOverview;
