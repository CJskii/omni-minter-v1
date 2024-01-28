import "../styles/globals.css";
// import "@fontsource/ibm-plex-mono";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useReferalCode from "../common/components/hooks/useReferalCode";
import { wagmiConfig, theme, chains } from "../constants/config/wagmiConfig";
import Alert from "../common/components/elements/Alert";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Inter, Raleway } from "next/font/google";
import Provider from "@/components/dashboard/provider";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  trustWallet,
  rainbowWallet,
} from "@thirdweb-dev/react";

import { Ethereum, Polygon } from "@thirdweb-dev/chains";

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const inter = Inter({ subsets: ["latin"] });

// const Navbar = dynamic(() => import("../common/components/elements/Navbar"), {
//   loading: () => <span className="loading loading-dots loading-lg"></span>,
//   ssr: true,
// });

// const Footer = dynamic(() => import("../common/components/elements/Footer"), {
//   loading: () => <span className="loading loading-dots loading-lg"></span>,
//   ssr: false,
// });

// const alertProps = {
//   title:
//     "Share your thoughts in our quick survey and enter the draw for 50 USDC - it's your chance to make an impact and win!",
//   link: "https://mintly.deform.cc/survey",
// };

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useReferalCode(router);

  return (
    <>
      {/* TODO: Remove wagmi and rainbowkit provider  */}
      {/* Figure out how to pass existing chain setup to thirdweb provider  */}
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <ThirdwebProvider
            activeChain={Polygon}
            supportedChains={[Ethereum, Polygon]}
            clientId="5750b942ae7000c3536f29a336a2e915"
            supportedWallets={[
              metamaskWallet({ recommended: true }),
              coinbaseWallet(),
              walletConnect(),
              localWallet(),
              embeddedWallet({
                auth: {
                  options: ["email", "google", "apple"],
                },
              }),
              trustWallet(),
              rainbowWallet(),
            ]}
            authConfig={{
              authUrl: "/api/auth",
              domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
            }}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className={`${raleway.variable}`}>
                <Component {...pageProps} />
              </div>
            </ThemeProvider>
          </ThirdwebProvider>
        </RainbowKitProvider>
      </WagmiConfig>
      {/* <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={theme}>
          <div className="flex flex-col justify-between items-center min-h-screen font-plex-mono">
            <div className="flex flex-col justify-center items-center w-full">
              <Alert {...alertProps} />
              <Navbar />
            </div>

            <main className="flex flex-col justify-center items-center gap-4 py-8 px-4 rounded-lg my-4 w-full min-h-full">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </RainbowKitProvider>
      </WagmiConfig> */}
    </>
  );
}

export default MyApp;
