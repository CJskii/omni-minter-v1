export interface Network {
  id: number;
  name: string;
  network: string;
  iconUrl?: string;
  iconBackground?: string;
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  [key: string]: any;
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
}
