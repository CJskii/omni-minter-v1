import { Chain } from "@rainbow-me/rainbowkit";

export const beraArtio: Chain = {
  id: 80085,
  name: "Berachain Artio",
  network: "bera-testnet",
  iconBackground: "#000000",
  nativeCurrency: {
    name: "Bera",
    symbol: "BERA",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["https://artio.rpc.berachain.com/"] },
    default: { http: ["https://artio.rpc.berachain.com/"] },
  },
  blockExplorers: {
    default: {
      name: "Artio Testnet Explorer",
      url: "https://artio.beratrail.io/",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3661165,
    },
  },
  testnet: false,
};
