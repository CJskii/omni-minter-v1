export const getNFTEnvVarName = (fromNetwork: string) => {
  switch (fromNetwork) {
    case "BSC":
      return process.env.NEXT_PUBLIC_BSC_NFT_CONTRACT_ADDRESS;
    case "AVALANCHE":
      return process.env.NEXT_PUBLIC_AVALANCHE_NFT_CONTRACT_ADDRESS;
    case "FANTOM":
      return process.env.NEXT_PUBLIC_FANTOM_NFT_CONTRACT_ADDRESS;
    case "CELO":
      return process.env.NEXT_PUBLIC_CELO_NFT_CONTRACT_ADDRESS;
    case "MOONBEAM":
      return process.env.NEXT_PUBLIC_MOONBEAM_NFT_CONTRACT_ADDRESS;
    case "OPTIMISM":
      return process.env.NEXT_PUBLIC_OPTIMISM_NFT_CONTRACT_ADDRESS;
    case "KLAYTN":
      return process.env.NEXT_PUBLIC_KLAYTN_NFT_CONTRACT_ADDRESS;
    case "ARBITRUM":
      return process.env.NEXT_PUBLIC_ARBITRUM_NFT_CONTRACT_ADDRESS;
    case "POLYGON":
      return process.env.NEXT_PUBLIC_POLYGON_NFT_CONTRACT_ADDRESS;
    case "BASE":
      return process.env.NEXT_PUBLIC_BASE_NFT_CONTRACT_ADDRESS;
    default:
      return "";
  }
};
