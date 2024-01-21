import "../styles/globals.css";
import "@fontsource/ibm-plex-mono";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useReferalCode from "../common/components/hooks/useReferalCode";
import { wagmiConfig, theme, chains } from "../constants/config/wagmiConfig";
import Alert from "../common/components/elements/Alert";

const Navbar = dynamic(() => import("../common/components/elements/Navbar"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const Footer = dynamic(() => import("../common/components/elements/Footer"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: false,
});

const alertProps = {
  title:
    "Share your thoughts in our quick survey and enter the draw for 50 USDC - it's your chance to make an impact and win!",
  link: "https://app.deform.cc/form/e6f8a515-1a03-4d57-bd13-42edad13db8a/",
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useReferalCode(router);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={theme}>
        <div className="flex flex-col justify-between items-center min-h-screen font-plex-mono">
          <Alert {...alertProps} />
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
