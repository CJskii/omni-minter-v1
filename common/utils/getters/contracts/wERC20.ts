export const getERC20GasEnvVarName = (fromNetwork: string) => {
  switch (fromNetwork) {
    case "BSC":
      return process.env.NEXT_PUBLIC_BSC_GAS_TOKEN_CONTRACT_ADDRESS;
    case "AVALANCHE":
      return process.env.NEXT_PUBLIC_AVALANCHE_GAS_TOKEN_CONTRACT_ADDRESS;
    case "FANTOM":
      return process.env.NEXT_PUBLIC_FANTOM_GAS_TOKEN_CONTRACT_ADDRESS;
    case "CELO":
      return process.env.NEXT_PUBLIC_CELO_GAS_TOKEN_CONTRACT_ADDRESS;
    case "MOONBEAM":
      return process.env.NEXT_PUBLIC_MOONBEAM_GAS_TOKEN_CONTRACT_ADDRESS;
    case "OPTIMISM":
      return process.env.NEXT_PUBLIC_OPTIMISM_GAS_TOKEN_CONTRACT_ADDRESS;
    case "KLAYTN":
      return process.env.NEXT_PUBLIC_KLAYTN_GAS_TOKEN_CONTRACT_ADDRESS;
    case "ARBITRUM":
      return process.env.NEXT_PUBLIC_ARBITRUM_GAS_TOKEN_CONTRACT_ADDRESS;
    case "POLYGON":
      return process.env.NEXT_PUBLIC_POLYGON_GAS_TOKEN_CONTRACT_ADDRESS;
    case "BASE":
      return process.env.NEXT_PUBLIC_BASE_GAS_TOKEN_CONTRACT_ADDRESS;
    default:
      return "";
  }
};
