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
  if (type == "layerzero") {
    return networkTransferMappings.layerzero[contract][fromNetwork.name] || [];
  } else if (type == "wormhole") {
    return networkTransferMappings.wormhole[contract][fromNetwork.name] || [];
  }
};
