import { RouterProvider } from "react-router";
import { AuthProvider } from "./providers/AuthProvider";
import { GlobalStyles } from "./styles/GlobalStyles";
import { router } from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <GlobalStyles />
    </AuthProvider>
  );
};

export default App;
