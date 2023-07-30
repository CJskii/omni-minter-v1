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
  const address = CONTRACT_ADDRESS[fromNetwork.toLowerCase()];
  return address;
};

export const getRemoteChainId = (targetNetwork: string) => {
  targetNetwork = transformNetworkName(targetNetwork);
  const remoteChainId = CHAIN_ID[targetNetwork.toLowerCase()];
  return remoteChainId;
};

const transformNetworkName = (networkName: string) => {
  if (networkName.toLowerCase() === "polygon mumbai") {
    console.log("changing network");
    networkName = "mumbai";
  }
  if (networkName.toLowerCase() === "optimism goerli") {
    networkName = "optimism-goerli";
  }
  return networkName;
};
