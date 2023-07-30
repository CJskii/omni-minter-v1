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
  fromNetwork = transformNetworkName(fromNetwork);
  const address = CONTRACT_ADDRESS[fromNetwork.toLowerCase()];
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
    default:
      break;
  }
  return networkName;
};
