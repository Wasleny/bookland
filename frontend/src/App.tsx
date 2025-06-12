import { RouterProvider } from "react-router";
import { AuthProvider } from "./providers/AuthProvider";
import { GlobalStyles } from "./styles/GlobalStyles";
import { router } from "./routes";
import { BookProvider } from "./providers/BookProvider";
import { AuthorProvider } from "./providers/AuthorProvider";
import { SeriesProvider } from "./providers/SeriesProvider";

const App = () => {
  return (
    <AuthProvider>
      <AuthorProvider>
        <SeriesProvider>
          <BookProvider>
            <RouterProvider router={router} />
            <GlobalStyles />
          </BookProvider>
        </SeriesProvider>
      </AuthorProvider>
    </AuthProvider>
  );
};

export default App;
