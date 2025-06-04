import "@emotion/react";
import { theme } from "./theme";

type CustomTheme = typeof theme;

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends CustomTheme {}
}
