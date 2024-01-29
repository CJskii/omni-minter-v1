import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "@fontsource/ibm-plex-mono";
import { getSupportedChains } from "./chainsConfig";

const customChains = getSupportedChains();

export const theme = darkTheme({
  accentColor: "#ff57b6",
  accentColorForeground: "#181920",
  borderRadius: "small",
  fontStack: "system",
  overlayBlur: "small",
});

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...customChains],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_WALLETCONNECT_APP_NAME || "",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
