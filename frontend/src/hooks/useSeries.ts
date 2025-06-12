import { useContext } from "react";
import { SeriesContext } from "../contexts/SeriesContext";

export const useSeries = () => {
  const context = useContext(SeriesContext);

  if (!context) throw new Error("useSeries deve ser usado com o SeriesContext");
  return context;
};
