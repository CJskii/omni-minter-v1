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
  deployedContracts?: {
    [key: string]: {
      address: string;
      ABI: any;
    };
  };
  lzParams?: {
    lzEndpointAddress?: string;
    remoteChainId?: number;
  };
}

export interface NetworkModalProps {
  selectedNetwork: Network;
  onNetworkSelect: (network: any) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  filteredChains: any[];
  dialogId: string;
  onClose: (dialogId: string) => void;
  title: string;
  contractProvider: {
    type: string;
    contract: string;
  };
}
