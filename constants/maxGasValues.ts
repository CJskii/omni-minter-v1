interface MaxGasValues {
  [key: string]: {
    adapterParamMaxGas: number;
  };
}

export const maxGasValues: MaxGasValues = {
  arbitrum: {
    adapterParamMaxGas: 0.02,
  },
  avalanche: {
    adapterParamMaxGas: 12,
  },
  bsc: {
    adapterParamMaxGas: 1.2,
  },
  fantom: {
    adapterParamMaxGas: 600,
  },
  optimism: {
    adapterParamMaxGas: 0.02,
  },
  sepolia: {
    adapterParamMaxGas: 0.1,
  },
  celo: {
    adapterParamMaxGas: 0.05,
  },
  moonbeam: {
    adapterParamMaxGas: 6,
  },
  moonriver: {
    adapterParamMaxGas: 0.05,
  },
  zora: {
    adapterParamMaxGas: 0.02,
  },
  canto: {
    adapterParamMaxGas: 0.95,
  },
  harmony: {
    adapterParamMaxGas: 6,
  },
  zksync: {
    adapterParamMaxGas: 0.02,
  },
  coredao: {
    adapterParamMaxGas: 0.25,
  },
  mantle: {
    adapterParamMaxGas: 0.2,
  },
  metis: {
    adapterParamMaxGas: 0.05,
  },
  polygon: {
    adapterParamMaxGas: 600,
  },
  linea: {
    adapterParamMaxGas: 0.02,
  },
  base: {
    adapterParamMaxGas: 0.02,
  },
  "arbitrum-goerli": {
    adapterParamMaxGas: 0.1,
  },
  "bsc-testnet": {
    adapterParamMaxGas: 0.1,
  },
  "linea-testnet": {
    adapterParamMaxGas: 0.1,
  },
  "optimism-goerli": {
    adapterParamMaxGas: 0.1,
  },
  mumbai: {
    adapterParamMaxGas: 0.1,
  },
  "zkevm-testnet": {
    adapterParamMaxGas: 0.1,
  },
  "mantle-testnet": {
    adapterParamMaxGas: 0.1,
  },
  "metis-testnet": {
    adapterParamMaxGas: 0.1,
  },
  "coreDao-testnet": {
    adapterParamMaxGas: 0.1,
  },
  goerli: {
    adapterParamMaxGas: 0.1,
  },
  zkevm: {
    adapterParamMaxGas: 0.02,
  },
};
