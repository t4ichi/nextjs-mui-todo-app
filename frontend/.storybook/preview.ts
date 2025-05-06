import { CssBaseline, ThemeProvider } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { darkTheme, lightTheme } from "../src/app/theme.ts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/material-icons";

// MSWの初期化
let options = {};
if (location.hostname === "t4ichi.github.io") {
  options = {
    serviceWorker: {
      url: "/nextjs-mui-todo-app/mockServiceWorker.js",
    },
  };
}
initialize(options);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles: CssBaseline,
      Provider: ThemeProvider,
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: "light",
    }),
  ],
  loaders: [mswLoader],
};

export default preview;
