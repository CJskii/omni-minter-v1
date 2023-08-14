import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/Navbar";
import "@fontsource/ibm-plex-mono";
import Head from "next/head";
import Footer from "../components/Footer";

import { getSupportedChains } from "../constants/chainsConfig";

// TODO: Add coreDAO chain

const customChains = getSupportedChains();

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...customChains],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "af8a43a89e4e91e96ced8cf39b3ac9a7",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#ff57b6",
          accentColorForeground: "#181920",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <Head>
          <title>Mintly</title>
          <meta name="description" content="Mintly" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col justify-between items-center min-h-screen font-plex-mono">
          <Navbar />
          <main className="flex flex-col justify-center items-center gap-4 py-8 px-4 rounded-lg my-4 w-full min-h-full">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
