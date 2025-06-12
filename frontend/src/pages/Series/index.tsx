import { useState } from "react";
import { useSeries } from "../../hooks/useSeries";
import Section from "../../components/Section";
import Typography from "../../components/Typography";
import { MdEditSquare } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import SeriesModal from "../../components/SeriesModal";
import { Actions, Div, Table } from "./styles";
import Button from "../../components/Button";

const Series = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [series, setSeries] = useState("");
  const { allSeries, isLoading, deleteSeries } = useSeries();

  const handleUpdate = (id: string) => {
    setSeries(id);
    setIsModalOpen(true);
    setIsUpdating(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSeries(id);
    } catch (error) {
      console.log("Erro ao criar série", error);
    }
  };

  return isLoading ? (
    <Typography variant="body">Carregando...</Typography>
  ) : (
    <Section>
      <Div>
        <Typography variant="h1">Séries Cadastradas</Typography>
        <Button variant="submit" onClick={() => setIsModalOpen(true)}>
          Cadastrar série
        </Button>
      </Div>
      <SeriesModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        seriesId={series}
      />

      {allSeries && allSeries.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Séries</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {allSeries.map((series, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{series.name}</td>
                <Actions>
                  <MdEditSquare
                    size={30}
                    onClick={() => handleUpdate(series.id)}
                  />
                  <IoTrashBin
                    size={30}
                    onClick={() => handleDelete(series.id)}
                  />
                </Actions>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Typography variant="h2">
          Não existem séries cadastradas ainda
        </Typography>
      )}
    </Section>
  );
};

export default Series;
