import { layerZeroMapping } from "./mapping/layerzero";
import { wormholeMapping } from "./mapping/wormhole";

type NetworkTransferMappings = {
  layerzero: {
    [contract: string]: {
      [network: string]: string[];
    };
  };
  wormhole: {
    [contract: string]: {
      [network: string]: string[];
    };
  };
};

export const networkTransferMappings: NetworkTransferMappings = {
  layerzero: {
    OFT: layerZeroMapping,
    REFUEL: layerZeroMapping,
    ONFT: layerZeroMapping,
  },
  wormhole: {
    ERC20: wormholeMapping,
    NFT: wormholeMapping,
    REFUEL: wormholeMapping,
  },
};
