import CONTRACT_ADDRESS_JSON from "../../../constants/contracts/contractAddress.json";
import CHAIN_ID_JSON from "../../../constants/chainId.json";

interface ContractAddressMap {
  [key: string]: string;
}

interface ChainIdMap {
  [key: string]: number;
}

const CHAIN_ID: ChainIdMap = CHAIN_ID_JSON as ChainIdMap;
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
        // throw new Error(
        //   `Contract address for network ${fromNetwork} is not set`
        // );
      }
    }

    return address as string;
  } catch (error) {
    console.error(`Cannot read contract for ${fromNetwork} `, error);
  }
};

export const getRemoteChainId = (targetNetwork: string) => {
  targetNetwork = transformNetworkName(targetNetwork);
  const remoteChainId = CHAIN_ID[targetNetwork.toLowerCase()];
  return remoteChainId;
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
};

const getNFTEnvVarName = (fromNetwork: string) => {
  switch (fromNetwork) {
    case "ZKEVM":
      return process.env.NEXT_PUBLIC_ZKEVM_NFT_CONTRACT_ADDRESS;
    case "OPTIMISM":
      return process.env.NEXT_PUBLIC_OPTIMISM_NFT_CONTRACT_ADDRESS;
    case "ARBITRUM":
      return process.env.NEXT_PUBLIC_ARBITRUM_NFT_CONTRACT_ADDRESS;
    case "BSC":
      return process.env.NEXT_PUBLIC_BSC_NFT_CONTRACT_ADDRESS;
    case "POLYGON":
      return process.env.NEXT_PUBLIC_POLYGON_NFT_CONTRACT_ADDRESS;
  }
};

const getONFTEnvVarName = (fromNetwork: string): string | undefined => {
  switch (fromNetwork) {
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
    case "AVALANCHE":
      return process.env.NEXT_PUBLIC_AVALANCHE_CONTRACT_ADDRESS;
    case "FANTOM":
      return process.env.NEXT_PUBLIC_FANTOM_CONTRACT_ADDRESS;
    case "CELO":
      return process.env.NEXT_PUBLIC_CELO_CONTRACT_ADDRESS;
    case "MOONBEAM":
      return process.env.NEXT_PUBLIC_MOONBEAM_CONTRACT_ADDRESS;
    case "MOONRIVER":
      return process.env.NEXT_PUBLIC_MOONRIVER_CONTRACT_ADDRESS;
    case "ZORA":
      return process.env.NEXT_PUBLIC_ZORA_CONTRACT_ADDRESS;
    case "CANTO":
      return process.env.NEXT_PUBLIC_CANTO_CONTRACT_ADDRESS;
    case "HARMONY":
      return process.env.NEXT_PUBLIC_HARMONY_CONTRACT_ADDRESS;
    case "ZKSYNC":
      return process.env.NEXT_PUBLIC_ZKSYNC_CONTRACT_ADDRESS;
    case "OPBNB":
      return process.env.NEXT_PUBLIC_OPBNB_CONTRACT_ADDRESS;
    case "SCROLL":
      return process.env.NEXT_PUBLIC_SCROLL_CONTRACT_ADDRESS;
    case "FUSE":
      return process.env.NEXT_PUBLIC_FUSE_CONTRACT_ADDRESS;
    case "TENET":
      return process.env.NEXT_PUBLIC_TENET_CONTRACT_ADDRESS;
    case "METER":
      return process.env.NEXT_PUBLIC_METER_CONTRACT_ADDRESS;
    case "KLAYTN":
      return process.env.NEXT_PUBLIC_KLAYTN_CONTRACT_ADDRESS;
    case "ARBITRUM-NOVA":
      return process.env.NEXT_PUBLIC_ARBITRUM_NOVA_CONTRACT_ADDRESS;
    case "ASTAR":
      return process.env.NEXT_PUBLIC_ASTAR_CONTRACT_ADDRESS;
    case "KAVA":
      return process.env.NEXT_PUBLIC_KAVA_CONTRACT_ADDRESS;
    case "AURORA":
      return process.env.NEXT_PUBLIC_AURORA_CONTRACT_ADDRESS;
    case "MANTA":
      return process.env.NEXT_PUBLIC_MANTA_CONTRACT_ADDRESS;
    case "PGN":
      return process.env.NEXT_PUBLIC_PGN_CONTRACT_ADDRESS;
    default:
      return undefined;
  }
};

const getRefuelEnvVarName = (fromNetwork: string): string | undefined => {
  switch (fromNetwork) {
    case "ZKEVM":
      return process.env.NEXT_PUBLIC_ZKEVM_REFUEL_CONTRACT;
    case "OPTIMISM":
      return process.env.NEXT_PUBLIC_OPTIMISM_REFUEL_CONTRACT;
    case "ARBITRUM":
      return process.env.NEXT_PUBLIC_ARBITRUM_REFUEL_CONTRACT;
    case "BSC":
      return process.env.NEXT_PUBLIC_BSC_REFUEL_CONTRACT;
    case "POLYGON":
      return process.env.NEXT_PUBLIC_POLYGON_REFUEL_CONTRACT;
    case "BASE":
      return process.env.NEXT_PUBLIC_BASE_REFUEL_CONTRACT;
    case "LINEA":
      return process.env.NEXT_PUBLIC_LINEA_REFUEL_CONTRACT;
    case "METIS":
      return process.env.NEXT_PUBLIC_METIS_REFUEL_CONTRACT;
    case "COREDAO":
      return process.env.NEXT_PUBLIC_COREDAO_REFUEL_CONTRACT;
    case "MANTLE":
      return process.env.NEXT_PUBLIC_MANTLE_REFUEL_CONTRACT;
    case "AVALANCHE":
      return process.env.NEXT_PUBLIC_AVALANCHE_REFUEL_CONTRACT;
    case "FANTOM":
      return process.env.NEXT_PUBLIC_FANTOM_REFUEL_CONTRACT;
    case "CELO":
      return process.env.NEXT_PUBLIC_CELO_REFUEL_CONTRACT;
    case "MOONBEAM":
      return process.env.NEXT_PUBLIC_MOONBEAM_REFUEL_CONTRACT;
    case "MOONRIVER":
      return process.env.NEXT_PUBLIC_MOONRIVER_REFUEL_CONTRACT;
    case "ZORA":
      return process.env.NEXT_PUBLIC_ZORA_REFUEL_CONTRACT;
    case "CANTO":
      return process.env.NEXT_PUBLIC_CANTO_REFUEL_CONTRACT;
    case "HARMONY":
      return process.env.NEXT_PUBLIC_HARMONY_REFUEL_CONTRACT;
    case "ZKSYNC":
      return process.env.NEXT_PUBLIC_ZKSYNC_REFUEL_CONTRACT;
    case "OPBNB":
      return process.env.NEXT_PUBLIC_OPBNB_REFUEL_CONTRACT;
    case "SCROLL":
      return process.env.NEXT_PUBLIC_SCROLL_REFUEL_CONTRACT;
    case "FUSE":
      return process.env.NEXT_PUBLIC_FUSE_REFUEL_CONTRACT;
    case "TENET":
      return process.env.NEXT_PUBLIC_TENET_REFUEL_CONTRACT;
    case "METER":
      return process.env.NEXT_PUBLIC_METER_REFUEL_CONTRACT;
    case "KLAYTN":
      return process.env.NEXT_PUBLIC_KLAYTN_REFUEL_CONTRACT;
    case "ARBITRUM-NOVA":
      return process.env.NEXT_PUBLIC_ARBITRUM_NOVA_REFUEL_CONTRACT;
    case "ASTAR":
      return process.env.NEXT_PUBLIC_ASTAR_REFUEL_CONTRACT;
    case "KAVA":
      return process.env.NEXT_PUBLIC_KAVA_REFUEL_CONTRACT;
    case "AURORA":
      return process.env.NEXT_PUBLIC_AURORA_REFUEL_CONTRACT;
    case "MANTA":
      return process.env.NEXT_PUBLIC_MANTA_REFUEL_CONTRACT;
    case "PGN":
      return process.env.NEXT_PUBLIC_PGN_REFUEL_CONTRACT;
    default:
      return undefined;
  }
};
