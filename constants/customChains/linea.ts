import { Chain } from "@rainbow-me/rainbowkit";

export const linea: Chain = {
  id: 59_144,
  name: "Linea",
  network: "linea",
  iconUrl: "/chain-icons/linea.svg",
  iconBackground: "#000000",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://linea.blockpi.network/v1/rpc/public"] },
    default: { http: ["https://linea.blockpi.network/v1/rpc/public"] },
  },
  blockExplorers: {
    default: { name: "Linea", url: "https://explorer.linea.build/" },
    etherscan: { name: "Linea", url: "https://explorer.linea.build/" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};
