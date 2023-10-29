import { Chain } from "@rainbow-me/rainbowkit";

export const tenet: Chain = {
  id: 1559,
  name: "Tenet",
  network: "tenet",
  iconUrl: "/chain-icons/tenet.svg",
  iconBackground: "#000000",
  nativeCurrency: {
    decimals: 18,
    name: "Tenet",
    symbol: "TENET",
  },
  rpcUrls: {
    public: { http: ["https://rpc.tenet.org"] },
    default: { http: ["https://rpc.tenet.org"] },
  },
  blockExplorers: {
    default: { name: "Tenet", url: "https://tenetscan.io/" },
    etherscan: { name: "Tenet", url: "https://tenetscan.io/" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};
