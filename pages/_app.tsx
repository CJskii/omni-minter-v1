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
import "@fontsource/ibm-plex-mono";
import { getSupportedChains } from "../constants/chainsConfig";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import HeadComponent from "../components/HeadComponent";

const Navbar = dynamic(() => import("../components/Navbar"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: false,
});

const Footer = dynamic(() => import("../components/Footer"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: false,
});

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
  const router = useRouter();

  useEffect(() => {
    const referralCode = router.query.invite;
    if (referralCode) {
      try {
        localStorage.setItem("Mintly_referralCode", referralCode as string);
      } catch (e) {
        console.error("Could not set referral code:", e);
      }

      if (router.pathname !== "/") {
        router.push("/");
      }
    }
  }, [router]);

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
        <HeadComponent
          title="Mintly"
          description="Earn rewards and have fun!"
          image="https://pbs.twimg.com/profile_banners/1280015719229386754/1691925867/1500x500"
          twitterHandle="@Mintly_lol"
        />
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
