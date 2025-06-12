import { StyledMain } from "./styles";
import SeriesOverview from "./SeriesOverview";
import AuthorsOverview from "./AuthorsOverview";
import BooksOverview from "./BooksOverview";

const CatalogManagement = () => {
  return (
    <StyledMain>
      <BooksOverview />
      <SeriesOverview />
      <AuthorsOverview />
    </StyledMain>
  );
};

export default CatalogManagement;
