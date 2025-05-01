import { MSWServerProvider } from "@/libs/msw/providers/msw-server-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { Providers } from "./providers";

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
            <Providers>{children}</Providers>
          </MSWServerProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
