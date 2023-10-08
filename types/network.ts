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
