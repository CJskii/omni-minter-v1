import { Network } from "../types/network";
import { networkTransferMappings } from "../constants/networkMappings";

export const getValidToNetworks = (fromNetwork: Network) => {
  return networkTransferMappings[fromNetwork.name] || [];
};
