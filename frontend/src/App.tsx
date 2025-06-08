import { RouterProvider } from "react-router";
import { AuthProvider } from "./providers/AuthProvider";
import { GlobalStyles } from "./styles/GlobalStyles";
import { router } from "./routes";
import { BookProvider } from "./providers/BookProvider";

const App = () => {
  return (
    <AuthProvider>
      <BookProvider>
        <RouterProvider router={router} />
        <GlobalStyles />
      </BookProvider>
    </AuthProvider>
  );
};

export default App;
