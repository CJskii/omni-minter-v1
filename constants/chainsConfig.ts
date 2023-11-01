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
  zora,
  mantle,
  metis,
  zkSync,
  canto,
  harmonyOne,
  optimism,
  arbitrum,
  polygon,
  celo,
  fantom,
  moonbeam,
  avalanche,
  moonriver,
  opBNB,
  scroll,
  arbitrumNova,
  fuse,
  meter,
  aurora,
  klaytn,
} from "wagmi/chains";

import { linea } from "./customChains/linea";
import { coreDao } from "./customChains/coreDao";
import { tenet } from "./customChains/tenet";
import { astar } from "./customChains/astar";
import { kava } from "./customChains/kava";
import { getContractAddress } from "../utils/getConstants";
import { getRemoteChainId } from "../utils/getConstants";
import { getMaxGasValue } from "../utils/getMaxGasValue";
import { CONTRACT_ABI } from "./contractABI";

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
  deployedContracts?: {
    [key: string]: {
      address: string;
      ABI: any;
    };
  };
  lzParams?: {
    lzEndpointAddress?: string;
    remoteChainId?: number;
  };
};

export const mainnetChains: ChainConfig[] = [
  {
    ...base,
    iconUrl: "/chain-icons/base.svg",
    remoteChainId: 184,
    lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  },
  {
    ...linea,
    iconUrl: "/chain-icons/linea.svg",
    remoteChainId: 183,
    lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  },
  {
    ...arbitrum,
    iconUrl: "/chain-icons/arbitrum.svg",
    remoteChainId: 110,
    lzEndpointAddress: "0x3c2269811836af69497E5F486A85D7316753cf62",
  },
  {
    ...arbitrumNova,
    iconUrl: "/chain-icons/arb-nova.svg",
    remoteChainId: 175,
    lzEndpointAddress: "0x4EE2F9B7cf3A68966c370F3eb2C16613d3235245",
  },
  {
    ...optimism,
    iconUrl: "/chain-icons/optimism.svg",
    remoteChainId: 111,
    lzEndpointAddress: "0x3c2269811836af69497E5F486A85D7316753cf62",
  },
  {
    ...opBNB,
    iconUrl: "/chain-icons/opbnb.svg",
    remoteChainId: 202,
    lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  },
  {
    ...scroll,
    iconUrl: "/chain-icons/scroll.svg",
    remoteChainId: 214,
    lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  },
  {
    ...zkSync,
    iconUrl: "/chain-icons/zksync.svg",
    remoteChainId: 165,
    lzEndpointAddress: "0x9b896c0e23220469C7AE69cb4BbAE391eAa4C8da",
  },
  {
    ...zora,
    iconUrl: "/chain-icons/zora.svg",
    remoteChainId: 195,
    lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  },
  {
    ...bsc,
    iconUrl: "/chain-icons/bsc.svg",
    remoteChainId: 102,
    lzEndpointAddress: "0x3c2269811836af69497E5F486A85D7316753cf62",
  },
  {
    ...polygon,
    iconUrl: "/chain-icons/polygon.svg",
    remoteChainId: 109,
    lzEndpointAddress: "0x3c2269811836af69497E5F486A85D7316753cf62",
  },
  {
    ...polygonZkEvm,
    iconUrl: "/chain-icons/polygon-zkevm.svg",
    remoteChainId: 158,
    lzEndpointAddress: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  },
  {
    ...mantle,
    iconUrl: "/chain-icons/mantle.svg",
    remoteChainId: 181,
    lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  },
  {
    ...metis,
    iconUrl: "/chain-icons/metis.svg",
    remoteChainId: 151,
    lzEndpointAddress: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  },
  {
    ...coreDao,
    iconUrl: "/chain-icons/coredao.svg",
    remoteChainId: 153,
    lzEndpointAddress: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  },
  {
    ...avalanche,
    iconUrl: "/chain-icons/avalanche.svg",
    remoteChainId: 106,
    lzEndpointAddress: "0x3c2269811836af69497E5F486A85D7316753cf62",
  },
  {
    ...fantom,
    iconUrl: "/chain-icons/fantom.svg",
    remoteChainId: 112,
    lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  },
  {
    ...celo,
    iconUrl: "/chain-icons/celo.svg",
    remoteChainId: 125,
    lzEndpointAddress: "0x3A73033C0b1407574C76BdBAc67f126f6b4a9AA9",
  },
  {
    ...moonbeam,
    iconUrl: "/chain-icons/moonbeam.svg",
    remoteChainId: 126,
    lzEndpointAddress: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  },
  {
    ...moonriver,
    iconUrl: "/chain-icons/moonriver.svg",
    remoteChainId: 167,
    lzEndpointAddress: "0x7004396C99D5690da76A7C59057C5f3A53e01704",
  },
  {
    ...canto,
    iconUrl: "/chain-icons/canto.svg",
    remoteChainId: 159,
    lzEndpointAddress: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  },
  {
    ...harmonyOne,
    iconUrl: "/chain-icons/harmony.svg",
    remoteChainId: 116,
    lzEndpointAddress: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  },
  // {
  //   ...aurora,
  //   iconUrl: "/chain-icons/aurora.svg",
  //   remoteChainId: 211,
  //   lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  // },
  // {
  //   ...astar,
  //   iconUrl: "/chain-icons/astar.svg",
  //   remoteChainId: 210,
  //   lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  // },
  // {
  //   ...fuse,
  //   iconUrl: "/chain-icons/fuse.svg",
  //   remoteChainId: 138,
  //   lzEndpointAddress: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  // },
  {
    ...meter,
    iconUrl: "/chain-icons/meter.svg",
    remoteChainId: 176,
    lzEndpointAddress: "0xa3a8e19253Ab400acDac1cB0eA36B88664D8DedF",
  },
  // {
  //   ...tenet,
  //   iconUrl: "/chain-icons/tenet.svg",
  //   remoteChainId: 173,
  //   lzEndpointAddress: "0x2D61DCDD36F10b22176E0433B86F74567d529aAa",
  // },
  // {
  //   ...kava,
  //   iconUrl: "/chain-icons/kava.svg",
  //   remoteChainId: 177,
  //   lzEndpointAddress: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
  // },
  // {
  //   ...klaytn,
  //   iconUrl: "/chain-icons/klaytn.svg",
  //   remoteChainId: 150,
  //   lzEndpointAddress: "0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4",
  //   rpcUrls: {
  //     public: { http: ["https://klaytn.drpc.org"] },
  //     default: { http: ["https://klaytn.drpc.org"] },
  //   },
  // },
].map((chain) => ({
  ...chain,
  deployedContracts: {
    ONFT: {
      address: getContractAddress(chain.name),
      ABI: CONTRACT_ABI,
    },
  },
  lzParams: {
    lzEndpointAddress: chain.lzEndpointAddress,
    remoteChainId: getRemoteChainId(chain.name),
    maxGas: getMaxGasValue(chain.name),
  },
}));

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
