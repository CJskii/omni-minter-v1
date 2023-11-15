import { Chain } from "@rainbow-me/rainbowkit";

export const tenet: Chain = {
  id: 1559,
  name: "Tenet",
  network: "tenet-mainnet",
  iconUrl: "/chain-icons/tenet.svg",
  iconBackground: "#000000",
  nativeCurrency: {
    name: "TENET",
    symbol: "TENET",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["https://rpc.tenet.org"] },
    default: { http: ["https://rpc.tenet.org"] },
  },
  blockExplorers: {
    default: { name: "TenetScan Mainnet", url: "https://tenetscan.io/" },
  },
  testnet: false,
};
