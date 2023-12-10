export type RpcUrls = {
  http: readonly string[];
  webSocket?: readonly string[];
};

export interface Network {
  id: number;
  network: string;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    [key: string]: RpcUrls;
    default: RpcUrls;
    public: RpcUrls;
  };
  iconUrl?: string;
  blockExplorers?: any;
  contracts?: {
    [key: string]: any;
  };
  testnet?: boolean;
  remoteChainId?: number;
  lzEndpointAddress?: string;
  deployedContracts?: DeployedContracts;
  lzParams?: {
    lzEndpointAddress?: string;
    remoteChainId?: number;
  };
  whParams?: {
    whEndpointAddress?: string;
    remoteChainId?: number;
  };
}

type DeployedContracts = {
  layerzero: {
    ONFT: {
      address: string;
      ABI: any[];
    };
    REFUEL: {
      address: string;
      ABI: any[];
    };
    OFT: {
      address: string;
      ABI: any[];
    };
  };
  wormhole: {
    NFT: {
      address: string;
      ABI: any[];
    };
    ERC20: {
      address: string;
      ABI: any[];
    };
    REFUEL: {
      address: string;
      ABI: any[];
    };
  };
};

// the key will be always there but array might be empty
export type ExtendedNetwork = Network & {
  contractProviders: {
    [key: string]: string[];
  };
};

export interface NetworkModalProps {
  selectedNetwork: Network;
  onNetworkSelect: (network: any) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  filteredChains: any[];
  dialogId: string;
  onClose: (dialogId: string) => void;
  title: string;
}
