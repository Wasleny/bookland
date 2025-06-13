import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/setupTests.ts",
        "**/*.d.ts",
        "node_modules/",
        "src/mocks/**",
        "src/types/**",
        "**/styles.ts",
        "src/styles/GlobalStyles.tsx",
        "src/theme/theme.ts",
        "src/constants/**"
      ],
    },
  },
});
