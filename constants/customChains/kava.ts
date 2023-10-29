import { Chain } from "@rainbow-me/rainbowkit";

export const kava: Chain = {
  id: 2222,
  name: "Kava",
  network: "kava",
  iconUrl: "/chain-icons/kava.svg",
  iconBackground: "#000000",
  nativeCurrency: {
    decimals: 18,
    name: "Kava",
    symbol: "KAVA",
  },
  rpcUrls: {
    public: { http: ["https://kava-evm.publicnode.com"] },
    default: { http: ["https://kava-evm.publicnode.com"] },
  },
  blockExplorers: {
    default: { name: "Kava Scan", url: "https://kavascan.com/" },
    etherscan: { name: "Kava Scan", url: "https://kavascan.com/" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
  testnet: false,
};
