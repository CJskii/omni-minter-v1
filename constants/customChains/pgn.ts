import { Chain } from "@rainbow-me/rainbowkit";

export const pgn: Chain = {
  id: 424,
  name: "PGN",
  network: "pgn-mainnet",
  iconUrl: "/chain-icons/pgn.svg",
  iconBackground: "#000000",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["https://rpc.publicgoods.network"] },
    default: { http: ["https://rpc.publicgoods.network"] },
  },
  blockExplorers: {
    default: {
      name: "Public Goods Network Explorer",
      url: "https://explorer.publicgoods.network/",
    },
  },
  testnet: false,
};
