import type { Format } from "./common";

export interface BookProps {
  id: string;
  title: string;
  originalTitle?: string;
  authors: string[];
  mainGenre?: string;
  secondaryGenres?: string[];
  tropes?: string[];
  cover: string;
  series?: string;
  originalSeries?: string;
  bookNumber?: number;
  averageRating?: number; //number between 1 and 5
  reviewsCount?: number;
  ratingsCount?: number;
  synopsis?: string;
  format?: Format;
  pages?: number;
  publicationDate?: Date;
  publisher?: string;
  isbn13?: string;
  isbn10?: string;
  asin?: string
  language?: string;// ex: 'Inglês', 'Português
  editionCount?: number;
}
