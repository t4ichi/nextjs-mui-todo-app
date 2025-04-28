export function MSWServerProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.USE_MOCK === "true"
  ) {
    const { server } = require("@/libs/msw/node");
    server.listen();
  }
  return <>{children}</>;
}
