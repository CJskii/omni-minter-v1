import CONTRACT_ADDRESS_JSON from "../../../constants/contracts/contractAddress.json";
import CHAIN_ID_LZ from "../../../constants/contracts/layerzeroChainId.json";
import CHAIN_ID_WH from "../../../constants/contracts/wormholeChainId.json";
import { getNFTEnvVarName } from "./contracts/wNFT";
import { getONFTEnvVarName } from "./contracts/onft";
import { getRefuelEnvVarName } from "./contracts/refuel";
import { getOFTEnvVarName } from "./contracts/oft";

interface ContractAddressMap {
  [key: string]: string;
}

interface ChainIdMap {
  [key: string]: number;
}

const LZ_CHAIN_ID: ChainIdMap = CHAIN_ID_LZ as ChainIdMap;
const WH_CHAIN_ID: ChainIdMap = CHAIN_ID_WH as ChainIdMap;

const CONTRACT_ADDRESS: ContractAddressMap =
  CONTRACT_ADDRESS_JSON as ContractAddressMap;

export const getContractAddress = (fromNetwork: string, contract: string) => {
  try {
    let address = "";
    fromNetwork = transformNetworkName(fromNetwork).toUpperCase();
    const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

    if (env === "mainnet") {
      const envVarName = getEnvVarName(fromNetwork, contract);
      address = envVarName ? envVarName : "";

      if (!address) {
        // throw new Error(`Environment variable ${envVarName} is not set`);
        return "";
      }
    } else {
      address = CONTRACT_ADDRESS[fromNetwork.toLowerCase()];

      if (!address) {
        return "";
        // throw new Error(`Environment variable ${envVarName} is not set`);
      }
    }

    return address as string;
  } catch (error) {
    console.error(`Cannot read contract for ${fromNetwork} `, error);
  }
};

export const getLayerZeroChainId = (targetNetwork: string) => {
  targetNetwork = transformNetworkName(targetNetwork);
  const remoteChainId = LZ_CHAIN_ID[targetNetwork.toLowerCase()];
  return remoteChainId;
};

export const getWormholeChainId = (targetNetwork: string) => {
  targetNetwork = transformNetworkName(targetNetwork);
  const remoteChainId = WH_CHAIN_ID[targetNetwork.toLowerCase()];
  return remoteChainId;
};

const getEnvVarName = (fromNetwork: string, contract: string) => {
  if (contract === "ONFT") {
    return getONFTEnvVarName(fromNetwork);
  }
  if (contract === "REFUEL") {
    return getRefuelEnvVarName(fromNetwork);
  }
  if (contract === "NFT") {
    return getNFTEnvVarName(fromNetwork);
  }
  if (contract === "OFT") {
    return getOFTEnvVarName(fromNetwork);
  }
};

export const transformNetworkName = (networkName: string) => {
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
    case "avalanche":
      networkName = "avalanche";
      break;
    case "fantom":
      networkName = "fantom";
      break;
    case "celo":
      networkName = "celo";
      break;
    case "moonbeam":
      networkName = "moonbeam";
      break;
    case "moonriver":
      networkName = "moonriver";
      break;
    case "zora":
      networkName = "zora";
      break;
    case "canto":
      networkName = "canto";
      break;
    case "harmony one":
      networkName = "harmony";
      break;
    case "zksync era":
      networkName = "zksync";
      break;
    case "opbnb":
      networkName = "opbnb";
      break;
    case "scroll":
      networkName = "scroll";
      break;
    case "fuse":
      networkName = "fuse";
      break;
    case "tenet":
      networkName = "tenet";
      break;
    case "meter":
      networkName = "meter";
      break;
    case "klaytn":
      networkName = "klaytn";
      break;
    case "arbitrum nova":
      networkName = "arbitrum-nova";
      break;
    case "astar":
      networkName = "astar";
      break;
    case "kava evm":
      networkName = "kava";
      break;
    case "aurora":
      networkName = "aurora";
      break;
    case "manta pacific":
      networkName = "manta";
      break;
    case "pgn":
      networkName = "pgn";
      break;
    default:
      break;
  }
  return networkName;
};
