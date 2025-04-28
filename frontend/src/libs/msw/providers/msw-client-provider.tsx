"use client";
import { useEffect, useState } from "react";

export function MSWClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mockingEnabled, enableMocking] = useState(false);

  useEffect(() => {
    async function enableApiMocking() {
      /**
       * @fixme Next puts this import to the top of
       * this module and runs it during the build
       * in Node.js. This makes "msw/browser" import to fail.
       */
      if (
        process.env.NEXT_RUNTIME !== "nodejs" &&
        process.env.USE_MOCK === "true"
      ) {
        const { worker } = await import("@/libs/msw/browser");
        await worker.start();
        enableMocking(true);
      }
      enableMocking(true);
    }

    enableApiMocking();
  }, []);

  if (!mockingEnabled) {
    return null;
  }

  return <>{children}</>;
}
