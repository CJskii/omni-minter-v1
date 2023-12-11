import { Network } from "../../common/types/network";

export const dummyNetwork: Network = {
  id: 0,
  name: "Not supported",
  network: "dummy",
  iconUrl: "/chain-icons/unavailable.svg",
  nativeCurrency: {
    decimals: 18,
    name: "dummy",
    symbol: "DUMMY",
  },
  rpcUrls: {
    public: { http: [""] },
    default: { http: [""] },
  },

  testnet: false,
};
