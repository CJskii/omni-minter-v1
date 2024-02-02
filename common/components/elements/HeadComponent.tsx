import Head from "next/head";

interface HeadComponentProps {
  title?: string;
  description?: string;
  image?: string;
  twitterHandle?: string;
}

const HeadComponent: React.FC<HeadComponentProps> = ({
  title = "Mintly: Omnichain Interoperability with LayerZero and Wormhole Technology",
  description = "Mintly redefines blockchain efficiency with wallet integration, gas refueling, cross-chain messaging, and interoperability, all powered by LayerZero and Wormhole. Mint and Bridge wERC20, OFT, wNFT and ONFT tokens across multiple chains.",
  image = "https://pbs.twimg.com/profile_banners/1280015719229386754/1691925867/1500x500",
  twitterHandle = "@Mintly_lol",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://verify.walletconnect.org/" />
      {/* Twitter Card data */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Open Graph data */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.mintly.lol/" />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Mintly" />
      {/* Additional tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="dark" />{" "}
    </Head>
  );
};

export default HeadComponent;
