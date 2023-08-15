import CONTRACT_ADDRESS_JSON from "../constants/contractAddress.json";
import CHAIN_ID_JSON from "../constants/chainId.json";

interface ContractAddressMap {
  [key: string]: string;
}

interface ChainIdMap {
  [key: string]: number;
}

const CHAIN_ID: ChainIdMap = CHAIN_ID_JSON as ChainIdMap;
const CONTRACT_ADDRESS: ContractAddressMap =
  CONTRACT_ADDRESS_JSON as ContractAddressMap;

export const getContractAddress = (fromNetwork: string) => {
  let address = "";
  fromNetwork = transformNetworkName(fromNetwork).toUpperCase();
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

  if (env === "mainnet") {
    const envVarName = getEnvVarName(fromNetwork);
    address = envVarName ? envVarName : "";

    if (!address) {
      throw new Error(`Environment variable ${envVarName} is not set`);
    }
  } else {
    address = CONTRACT_ADDRESS[fromNetwork.toLowerCase()];

    if (!address) {
      throw new Error(`Contract address for network ${fromNetwork} is not set`);
    }
  }

  return address;
};

export const getRemoteChainId = (targetNetwork: string) => {
  targetNetwork = transformNetworkName(targetNetwork);
  const remoteChainId = CHAIN_ID[targetNetwork.toLowerCase()];
  return remoteChainId;
};

const transformNetworkName = (networkName: string) => {
  switch (networkName.toLowerCase()) {
    case "polygon mumbai":
      networkName = "mumbai";
      break;
    case "optimism goerli":
      networkName = "optimism-goerli";
      break;
    case "arbitrum goerli":
      networkName = "arbitrum-goerli";
      break;
    case "base goerli":
      networkName = "base-testnet";
      break;
    case "linea goerli testnet":
      networkName = "linea-testnet";
      break;
    case "binance smart chain testnet":
      networkName = "bsc-testnet";
      break;
    case "polygon zkevm testnet":
      networkName = "zkevm-testnet";
      break;
    case "mantle testnet":
      networkName = "mantle-testnet";
      break;
    case "metis goerli":
      networkName = "metis-testnet";
      break;
    case "sepolia":
      networkName = "sepolia";
      break;
    case "coredao testnet":
      networkName = "coreDao-testnet";
      break;
    case "goerli":
      networkName = "goerli";
      break;
    case "polygon zkevm":
      networkName = "zkevm";
      break;
    case "base":
      networkName = "base";
      break;
    case "linea":
      networkName = "linea";
      break;
    case "op mainnet":
      networkName = "optimism";
      break;
    case "arbitrum one":
      networkName = "arbitrum";
      break;
    case "bnb smart chain":
      networkName = "bsc";
      break;
    case "polygon":
      networkName = "polygon";
      break;
    case "mantle":
      networkName = "mantle";
      break;
    case "metis":
      networkName = "metis";
      break;
    case "core dao":
      networkName = "coredao";
      break;
    default:
      break;
  }
  return networkName;
};

const getEnvVarName = (key: string): string | undefined => {
  switch (key) {
    case "ZKEVM":
      return process.env.NEXT_PUBLIC_ZKEVM_CONTRACT_ADDRESS;
    case "OPTIMISM":
      return process.env.NEXT_PUBLIC_OPTIMISM_CONTRACT_ADDRESS;
    case "ARBITRUM":
      return process.env.NEXT_PUBLIC_ARBITRUM_CONTRACT_ADDRESS;
    case "BSC":
      return process.env.NEXT_PUBLIC_BSC_CONTRACT_ADDRESS;
    case "POLYGON":
      return process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS;
    case "BASE":
      return process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS;
    case "LINEA":
      return process.env.NEXT_PUBLIC_LINEA_CONTRACT_ADDRESS;
    case "METIS":
      return process.env.NEXT_PUBLIC_METIS_CONTRACT_ADDRESS;
    case "COREDAO":
      return process.env.NEXT_PUBLIC_COREDAO_CONTRACT_ADDRESS;
    case "MANTLE":
      return process.env.NEXT_PUBLIC_MANTLE_CONTRACT_ADDRESS;
    default:
      return undefined;
  }
};
