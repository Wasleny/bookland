/* eslint-disable react-refresh/only-export-components */
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme/theme";
import type { ReactElement, ReactNode } from "react";
import { AuthorProvider } from "../../providers/AuthorProvider";
import { SeriesProvider } from "../../providers/SeriesProvider";
import { BookProvider } from "../../providers/BookProvider";
import { AuthProvider } from "../../providers/AuthProvider";

const AllProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AuthorProvider>
        <SeriesProvider>
          <BookProvider>
            {children}
          </BookProvider>
        </SeriesProvider>
      </AuthorProvider>
    </AuthProvider>
  </ThemeProvider>
);

const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { renderWithProviders as render };
