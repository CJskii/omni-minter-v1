import { Chain } from "@rainbow-me/rainbowkit";

export const coreDao: Chain = {
  id: 1116,
  name: "Core Dao",
  network: "coreDao",
  iconUrl: "/chain-icons/coredao.svg",
  iconBackground: "#000000",
  nativeCurrency: {
    decimals: 18,
    name: "Core",
    symbol: "CORE",
  },
  rpcUrls: {
    public: { http: ["https://rpc.coredao.org"] },
    default: { http: ["https://rpc.coredao.org"] },
  },
  blockExplorers: {
    default: { name: "CoreDao", url: "https://scan.coredao.org/" },
    etherscan: { name: "CoreDao", url: "https://scan.coredao.org/" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};
