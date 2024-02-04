import { activeChains } from "../constants/config/chainsConfig";
import Image, { StaticImageData } from "next/image";
import { useAccount } from "wagmi";
import HeadComponent from "../common/components/elements/HeadComponent";
import { Layout } from "@/components/dashboard/layout";
import { Typography } from "@/components/ui/typography";
import ellipseCurved from "@/assets/ellipse-curved.svg";
import DashboardCard from "@/components/dashboard/dashboard-card";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import arbNova from "/assets/chains/arb-nova.png";
import arb from "/assets/chains/arb.png";
import astar from "/assets/chains/astar.png";
import aurora from "/assets/chains/aurora.png";
import avalanche from "/assets/chains/avalanche.png";
import bsc from "/assets/chains/bsc.png";
import celo from "/assets/chains/celo.png";
import coreDao from "/assets/chains/core-dao.png";
import fantom from "/assets/chains/fantom.png";
import fuse from "/assets/chains/fuse.png";
import harmonyOne from "/assets/chains/harmony-one.png";
import kava from "/assets/chains/kava.png";
import klaytn from "/assets/chains/klaytn.png";
import manta from "/assets/chains/manta.png";
import mantle from "/assets/chains/mantle.png";
import meter from "/assets/chains/meter.png";
import metis from "/assets/chains/metis.png";
import moonbeam from "/assets/chains/moonbeam.png";
import moonriver from "/assets/chains/moonriver.png";
import opbnb from "/assets/chains/opbnb.png";
import pgn from "/assets/chains/pgn.png";
import polygonZkevm from "/assets/chains/polygon-zkevm.png";
import polygon from "/assets/chains/polygon.png";
import scroll from "/assets/chains/scroll.png";
import tenet from "/assets/chains/tenet.png";
import zksync from "/assets/chains/zksync.png";
import zora from "/assets/chains/zora.png";
import linea from "/assets/chains/linea.png";
import base from "/assets/chains/base.png";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ChainDetailCardProps {
  name: string;
  image: string | StaticImageData;
  nativeCurrency: string;
  exploreURL: string;
}

const supportedChains: ChainDetailCardProps[] = [
  {
    name: "Linea",
    image: linea,
    nativeCurrency: "ETH",
    exploreURL: "https://example.com/arbNova",
  },
  {
    name: "Base",
    image: base,
    nativeCurrency: "ETH",
    exploreURL: "https://example.com/arbNova",
  },
  {
    name: "Arbitrum Nova",
    image: arbNova,
    nativeCurrency: "ETH",
    exploreURL: "https://example.com/arbNova",
  },
  {
    name: "Arbitrum One",
    image: arb,
    nativeCurrency: "ETH",
    exploreURL: "https://example.com/arb",
  },
  {
    name: "Astar",
    image: astar,
    nativeCurrency: "ASTAR",
    exploreURL: "https://example.com/astar",
  },
  {
    name: "Aurora",
    image: aurora,
    nativeCurrency: "AURA",
    exploreURL: "https://example.com/aurora",
  },
  {
    name: "Avalanche",
    image: avalanche,
    nativeCurrency: "AVAX",
    exploreURL: "https://www.avalanche.org/",
  },
  {
    name: "BNB Smart Chain",
    image: bsc,
    nativeCurrency: "BNB",
    exploreURL: "https://example.com/bsc",
  },
  {
    name: "Celo",
    image: celo,
    nativeCurrency: "CELO",
    exploreURL: "https://example.com/celo",
  },
  {
    name: "Core Dao",
    image: coreDao,
    nativeCurrency: "CORE",
    exploreURL: "https://example.com/coreDao",
  },
  {
    name: "Fantom",
    image: fantom,
    nativeCurrency: "FTM",
    exploreURL: "https://example.com/fantom",
  },
  {
    name: "Fuse",
    image: fuse,
    nativeCurrency: "FUSE",
    exploreURL: "https://example.com/fuse",
  },
  {
    name: "Harmony One",
    image: harmonyOne,
    nativeCurrency: "ONE",
    exploreURL: "https://example.com/harmonyOne",
  },
  {
    name: "Kava EVM",
    image: kava,
    nativeCurrency: "KAVA",
    exploreURL: "https://example.com/kava",
  },
  {
    name: "Klaytn",
    image: klaytn,
    nativeCurrency: "KLAY",
    exploreURL: "https://example.com/klaytn",
  },
  {
    name: "Manta Pacific",
    image: manta,
    nativeCurrency: "MANTA",
    exploreURL: "https://example.com/manta",
  },
  {
    name: "Mantle",
    image: mantle,
    nativeCurrency: "MANTLE",
    exploreURL: "https://example.com/mantle",
  },
  {
    name: "Meter",
    image: meter,
    nativeCurrency: "MTR",
    exploreURL: "https://example.com/meter",
  },
  {
    name: "Metis",
    image: metis,
    nativeCurrency: "METIS",
    exploreURL: "https://example.com/metis",
  },
  {
    name: "Moonbeam",
    image: moonbeam,
    nativeCurrency: "GLMR",
    exploreURL: "https://example.com/moonbeam",
  },
  {
    name: "Moonriver",
    image: moonriver,
    nativeCurrency: "RIVER",
    exploreURL: "https://example.com/moonriver",
  },
  {
    name: "opBNB",
    image: opbnb,
    nativeCurrency: "OPBNB",
    exploreURL: "https://example.com/opbnb",
  },
  {
    name: "PGN",
    image: pgn,
    nativeCurrency: "PGN",
    exploreURL: "https://example.com/pgn",
  },
  {
    name: "Polygon zkEVM",
    image: polygonZkevm,
    nativeCurrency: "ZKEVM",
    exploreURL: "https://example.com/polygonZkevm",
  },
  {
    name: "Polygon",
    image: polygon,
    nativeCurrency: "MATIC",
    exploreURL: "https://example.com/polygon",
  },
  {
    name: "Scroll",
    image: scroll,
    nativeCurrency: "SCRL",
    exploreURL: "https://example.com/scroll",
  },
  {
    name: "Tenet",
    image: tenet,
    nativeCurrency: "TEN",
    exploreURL: "https://example.com/tenet",
  },
  {
    name: "zkSync Era",
    image: zksync,
    nativeCurrency: "ETH",
    exploreURL: "https://example.com/zksync",
  },
  {
    name: "Zora",
    image: zora,
    nativeCurrency: "ETH",
    exploreURL: "https://example.com/zora",
  },
];

const Chains = () => {
  // const { address } = useAccount();

  return (
    <>
      <HeadComponent
        title="Mintly: Supported Chains - Discover the Wide Range of Blockchain Networks Supported by Mintly."
        description="Discover the wide range of blockchain networks supported by Mintly, designed for seamless cross-chain interoperability. Dive into the details of each chain, understanding their unique offerings and native currencies for smarter cross-chain interactions."
      />
      <Layout
        className="py-24 md:w-11/12 mx-auto min-h-[90vh] "
        showGrid={false}
        showGradient={false}
      >
        <div className=" ">
          <div className="flex items-center md:justify-between md:flex-row flex-col">
            <div className="z-10 space-y-6 p-3 md:p-16">
              <Typography className="max-w-xs text-4xl font-bold leading-snug tracking-wide md:max-w-3xl md:text-6xl md:leading-none">
                Supported <span className="text-secondary">Chains</span>{" "}
              </Typography>
              <Typography
                variant={"paragraph"}
                className=" md:max-w-xl text-lg"
              >
                Explore the wide range of blockchain networks supported by
                Mintly, designed for seamless cross-chain interoperability.
              </Typography>
            </div>
            <div className=" relative">
              <Image src={ellipseCurved} alt="ellipseCurved" />
              <DashboardCard className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 rounded-full flex flex-col items-center justify-center w-60 h-60 md:h-72 md:w-72">
                <Typography className="max-w-xs text-4xl font-bold leading-snug tracking-wide md:max-w-3xl md:text-6xl md:leading-none">
                  {supportedChains.length}
                </Typography>
                <Typography variant={"paragraph"}>supported Chains</Typography>
              </DashboardCard>
            </div>
          </div>
        </div>
        <div className=" pb-24 pt-12  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {supportedChains.map((chain, idx) => (
            <div key={idx}>
              <ChainDetailCard
                image={chain.image}
                name={chain.name}
                nativeCurrency={chain.nativeCurrency}
                exploreURL={chain.exploreURL}
              />
            </div>
          ))}
        </div>
        {/* <section className="supported-chains">
        <div className="container flex flex-col justify-center items-center gap-8">
          <h2 className="section-title text-3xl font-bold leading-tight sm:text-4xl text-content-focus">
            Supported Chains
          </h2>
          <p className="section-description">
            Explore the wide range of blockchain networks supported by Mintly,
            designed for seamless cross-chain interoperability.
          </p>
          <p className="count-description">
            Total count: {activeChains.length}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChains.map((chain) => (
              <div key={chain.name} className="card w-96 bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src={chain.iconUrl ? chain.iconUrl : "/placeholder.png"}
                      alt={`${chain.name} logo`}
                      width={100}
                      height={100}
                    />
                    <h2 className="card-title pt-4 text-center">
                      {chain.name}
                    </h2>
                    <p>Native currency: {chain.nativeCurrency.symbol}</p>
                    <a
                      href={
                        address
                          ? `${chain.blockExplorers.default.url}/address/${address}`
                          : chain.blockExplorers.default.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link hover:text-primary"
                    >
                      View on Explorer
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      </Layout>
    </>
  );
};

export default Chains;

export const ChainDetailCard = ({
  image,
  name,
  nativeCurrency,
  exploreURL,
}: ChainDetailCardProps) => {
  return (
    <Card className=" bg-primary p-6 space-y-8">
      <div className=" flex items-center gap-3">
        <Avatar>
          <Image src={image as string} alt="logo" width={100} height={100} />
          <AvatarFallback className=" capitalize">
            {name[0] + name[1]}
          </AvatarFallback>
        </Avatar>
        <Typography variant={"large"} className="text-center">
          {name}
        </Typography>
      </div>
      <div className=" flex w-full items-center justify-between">
        <Typography variant={"smallTitle"}>
          Native currency: {nativeCurrency}
        </Typography>
        <Link
          href={exploreURL}
          target="_blank"
          className={cn(
            `${buttonVariants({ variant: "default", size: "sm" })} dark:bg-black dark:text-white dark:hover:bg-black/90 rounded-xl`,
          )}
        >
          Explore
        </Link>
      </div>
    </Card>
  );
};
