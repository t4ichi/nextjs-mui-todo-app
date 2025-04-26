import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { lightTheme } from "./theme";

if (process.env.NEXT_RUNTIME === "nodejs" && process.env.USE_MOCK === "true") {
	const { server } = require("../libs/msw/node");
	server.listen();
}

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
					<ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
				</body>
			</AppRouterCacheProvider>
		</html>
	);
}
