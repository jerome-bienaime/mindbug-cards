import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import { Provider } from "~/app/providers/ChakraProvider";
import { ColorModeScript } from "@chakra-ui/react";
import { config } from "./theme";

export const metadata: Metadata = {
  title: "Mindbug cards",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <TRPCReactProvider>
          <ColorModeScript initialColorMode={config.initialColorMode} />
          <Provider>{children}</Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
