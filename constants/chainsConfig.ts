import {
  goerli,
  polygonMumbai,
  optimismGoerli,
  arbitrumGoerli,
  sepolia,
  baseGoerli,
  lineaTestnet,
  bscTestnet,
  mantleTestnet,
  metisGoerli,
  polygonZkEvmTestnet,
  base,
  polygonZkEvm,
  bsc,
  mantle,
  metis,
  optimism,
  arbitrum,
  polygon,
  celo,
  fantom,
  moonbeam,
  avalanche,
  moonriver,
} from "wagmi/chains";

import { linea } from "./customChains/linea";
import { coreDao } from "./customChains/coreDao";

type RpcUrls = {
  http: readonly string[];
  webSocket?: readonly string[];
};

type ChainConfig = {
  id: number;
  network: string;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    [key: string]: RpcUrls;
    default: RpcUrls;
    public: RpcUrls;
  };
  iconUrl?: string;
  blockExplorers?: any;
  contracts?: {
    [key: string]: any;
  };
  testnet?: boolean;
};

export const mainnetChains: ChainConfig[] = [
  {
    ...base,
    iconUrl: "/chain-icons/base.svg",
  },
  {
    ...linea,
    iconUrl: "/chain-icons/linea.svg",
  },
  {
    ...arbitrum,
    iconUrl: "/chain-icons/arbitrum.svg",
  },
  {
    ...optimism,
    iconUrl: "/chain-icons/optimism.svg",
  },
  {
    ...bsc,
    iconUrl: "/chain-icons/bsc.svg",
  },
  {
    ...polygon,
    iconUrl: "/chain-icons/polygon.svg",
  },
  {
    ...polygonZkEvm,
    iconUrl: "/chain-icons/polygon-zkevm.svg",
  },
  // {
  //   ...mantle,
  //   iconUrl: "/chain-icons/mantle.svg",
  // },
  // {
  //   ...metis,
  //   iconUrl: "/chain-icons/metis.svg",
  // },
  {
    ...coreDao,
    iconUrl: "/chain-icons/coredao.svg",
  },
  {
    ...avalanche,
    iconUrl: "/chain-icons/avalanche.svg",
  },
  { ...fantom, iconUrl: "/chain-icons/fantom.svg" },
  { ...celo, iconUrl: "/chain-icons/celo.svg" },
  { ...moonbeam, iconUrl: "/chain-icons/moonbeam.svg" },
  { ...moonriver, iconUrl: "/chain-icons/moonriver.svg" },
];

export const testnetChains: ChainConfig[] = [
  {
    ...goerli,
    iconUrl: "/chain-icons/eth-logo.svg",
    name: "Goerli",
  },
  {
    ...sepolia,
    iconUrl: "/chain-icons/eth-logo.svg",
  },
  {
    ...arbitrumGoerli,
    iconUrl: "/chain-icons/arbitrum.svg",
  },
  {
    ...optimismGoerli,
    iconUrl: "/chain-icons/optimism.svg",
  },
  {
    ...baseGoerli,
    iconUrl: "/chain-icons/base.svg",
  },
  {
    ...lineaTestnet,
    iconUrl: "/chain-icons/linea.svg",
  },
  {
    ...bscTestnet,
    iconUrl: "/chain-icons/bsc.svg",
  },

  {
    ...polygonZkEvmTestnet,
    iconUrl: "/chain-icons/polygon-zkevm.svg",
  },
  {
    ...polygonMumbai,
    iconUrl: "/chain-icons/polygon.svg",
    rpcUrls: {
      public: { http: ["https://rpc.ankr.com/polygon_mumbai"] },
      default: { http: ["https://rpc.ankr.com/polygon_mumbai"] },
    },
  },
  {
    ...mantleTestnet,
    iconUrl: "/chain-icons/mantle.svg",
  },
  {
    ...metisGoerli,
    iconUrl: "/chain-icons/metis.svg",
  },
];

export const getSupportedChains = (): ChainConfig[] => {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
  switch (env) {
    case "mainnet":
      return mainnetChains;
    case "testnet":
      return testnetChains;
    default:
      console.error(`Unsupported ENVIRONMENT value: ${env}`);
      return [];
  }
};

export const activeChains = getSupportedChains();
