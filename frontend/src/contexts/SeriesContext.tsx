import { createContext } from "react";
import type { SeriesProps } from "../types/series";

export interface SeriesContextType {
  allSeries: SeriesProps[] | undefined;
  isLoading: boolean;
  getAllSeries: () => Promise<void>;
  getSeries: (seriesId: string) => SeriesProps | undefined;
  addSeries: (series: Omit<SeriesProps, "id">) => Promise<void>;
  updateSeries: (
    seriesId: string,
    series: Partial<SeriesProps>
  ) => Promise<void>;
  deleteSeries: (seriesId: string) => Promise<void>;
}

export const SeriesContext = createContext<SeriesContextType>({
    allSeries: undefined,
    isLoading: true,
    getAllSeries: async () => undefined,
    getSeries: () => undefined,
    addSeries: async () => undefined,
    updateSeries: async () => undefined,
    deleteSeries: async () => undefined,
})