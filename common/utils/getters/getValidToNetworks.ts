import { Network } from "../../types/network";
import { networkTransferMappings } from "../../../constants/networkMappings";

export const getValidToNetworks = ({
  fromNetwork,
  type,
  contract,
}: {
  fromNetwork: Network;
  type: string;
  contract: string;
}) => {
  // TODO: FILTER CHAINS BY CONTRACT PROVIDER (type, contract)
  return networkTransferMappings[fromNetwork.name] || [];
};
