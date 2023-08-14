import {
  goerli,
  mainnet,
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
} from "wagmi/chains";

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
    ...mainnet,
    iconUrl: "/chain-icons/eth-logo.svg",
  },
  {
    ...base,
    iconUrl: "/chain-icons/base.svg",
  },
  {
    ...polygonZkEvm,
    iconUrl: "/chain-icons/polygon-zkevm.svg",
  },
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
