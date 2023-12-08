import { Network } from "../../types/network";
import { networkTransferMappings } from "../../../constants/networkMappings";

export const getValidToNetworks = (fromNetwork: Network) => {
  console.log(fromNetwork);
  return networkTransferMappings[fromNetwork.name] || [];
};
