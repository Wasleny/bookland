import { useEffect, useState, type ReactNode } from "react";
import type { SeriesProps } from "../types/series";
import { mockSeries } from "../mocks/mockSeries";
import { SeriesContext } from "../contexts/SeriesContext";

interface SeriesProviderProps {
  children: ReactNode;
}

export const SeriesProvider = ({ children }: SeriesProviderProps) => {
  const [allSeries, setAllSeries] = useState<SeriesProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([getAllSeries()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const getAllSeries = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAllSeries(mockSeries);
        resolve();
      }, 500);
    });
  };

  const getSeries = (seriesId: string) => {
    return allSeries.find((s) => s.id === seriesId);
  };

  const addSeries = async (seriesData: Omit<SeriesProps, "id">) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newSeries: SeriesProps = {
          id: `series-${Date.now()}`,
          ...seriesData,
        };
        setAllSeries((prev) => [...prev, newSeries]);
        resolve();
      }, 500);
    });
  };

  const updateSeries = async (
    seriesId: string,
    seriesData: Partial<SeriesProps>
  ) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const seriesIndex = allSeries.findIndex((s) => s.id === seriesId);

        if (seriesIndex === -1)
          return reject(new Error("Série não encontrada."));

        const updatedS = {
          ...allSeries[seriesIndex],
          ...seriesData,
        };

        const updatedSeries = [...allSeries];
        updatedSeries[seriesIndex] = updatedS;

        setAllSeries(updatedSeries);
        resolve();
      }, 500);
    });
  };

  const deleteSeries = async (seriesId: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAllSeries(allSeries.filter((s) => s.id !== seriesId));
        resolve();
      }, 500);
    });
  };

  return (
    <SeriesContext.Provider
      value={{
        allSeries,
        isLoading,
        getAllSeries,
        getSeries,
        addSeries,
        updateSeries,
        deleteSeries,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
};
