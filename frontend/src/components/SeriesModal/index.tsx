import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import Input from "../Form/Input";
import Modal from "../Modal";
import Button from "../Button";
import Typography from "../Typography";
import { FormActions } from "../../pages/CatalogManagement/styles";
import { useSeries } from "../../hooks/useSeries";

interface SeriesModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isUpdating?: boolean;
  setIsUpdating?: Dispatch<SetStateAction<boolean>>;
  seriesId?: string;
}

const SeriesModal = ({
  setIsOpen,
  isOpen,
  isUpdating = false,
  setIsUpdating = () => {},
  seriesId,
}: SeriesModalProps) => {
  const [seriesName, setSeriesName] = useState("");
  const { addSeries, updateSeries, getSeries } = useSeries();

  useEffect(() => {
    if (isUpdating && seriesId) {
      const recoveredSeries = getSeries(seriesId);
      setSeriesName(recoveredSeries?.name ?? "");
    }
  }, [isUpdating, seriesId, getSeries]);

  const handleClose = () => {
    setIsOpen(false);
    setSeriesName("");
    setIsUpdating(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (isUpdating) {
        if (!seriesId) return;
        await updateSeries(seriesId, { name: seriesName });

        setIsUpdating(false);
      } else {
        await addSeries({ name: seriesName });
      }

      handleClose();
    } catch (error) {
      console.log("Erro ao criar série", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={onSubmit}>
        <Typography variant="h2">
          {isUpdating ? "Edite uma série" : "Cadastre uma série"}
        </Typography>
        <Input
          id="name"
          label="Nome da Série"
          onChange={(e) => setSeriesName(e.target.value)}
          type="text"
          value={seriesName}
        />
        <FormActions>
          <Button variant="remove" type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="submit" type="submit">
            Criar
          </Button>
        </FormActions>
      </form>
    </Modal>
  );
};

export default SeriesModal;
