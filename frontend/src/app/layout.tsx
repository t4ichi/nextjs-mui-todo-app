import { MSWClientProvider } from "@/libs/msw/providers/msw-client-provider";
import { MSWServerProvider } from "@/libs/msw/providers/msw-server-provider";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { lightTheme } from "./theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={roboto.variable}>
      <AppRouterCacheProvider>
        <body>
          <MSWServerProvider>
            <MSWClientProvider>
              <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
            </MSWClientProvider>
          </MSWServerProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
