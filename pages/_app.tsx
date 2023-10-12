import "../styles/globals.css";
import "@fontsource/ibm-plex-mono";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import HeadComponent from "../components/HeadComponent";
import useReferalCode from "../utils/hooks/useReferalCode";
import { wagmiConfig, theme, chains } from "../constants/wagmiConfig";

const Navbar = dynamic(() => import("../components/Navbar"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: false,
});

const Footer = dynamic(() => import("../components/Footer"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useReferalCode(router);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={theme}>
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
