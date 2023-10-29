import { Chain } from "@rainbow-me/rainbowkit";

export const astar: Chain = {
  id: 592,
  name: "Astar",
  network: "astar",
  iconUrl: "/chain-icons/astar.svg",
  iconBackground: "#000000",
  nativeCurrency: {
    decimals: 18,
    name: "Astar",
    symbol: "ASTR",
  },
  rpcUrls: {
    public: { http: ["https://astar.public.blastapi.io"] },
    default: { http: ["https://astar.public.blastapi.io"] },
  },
  blockExplorers: {
    default: { name: "Astar", url: "https://astar.subscan.io/" },
    etherscan: { name: "Astar", url: "https://astar.subscan.io/" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};
