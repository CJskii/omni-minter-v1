interface MaxGasValues {
  [key: string]: {
    adapterParamMaxGas?: number;
    refuel?: number;
  };
}

export const maxGasValuesLayerzero: MaxGasValues = {
  arbitrum: {
    adapterParamMaxGas: 0.2,
  },
  avalanche: {
    adapterParamMaxGas: 15,
  },
  bsc: {
    adapterParamMaxGas: 1.2,
  },
  fantom: {
    adapterParamMaxGas: 600,
  },
  optimism: {
    adapterParamMaxGas: 0.2,
  },
  celo: {
    adapterParamMaxGas: 0.05,
  },
  moonbeam: {
    adapterParamMaxGas: 8,
  },
  moonriver: {
    adapterParamMaxGas: 0.05,
  },
  zora: {
    adapterParamMaxGas: 0.05,
  },
  canto: {
    adapterParamMaxGas: 0.95,
  },
  harmony: {
    adapterParamMaxGas: 8,
  },
  zksync: {
    adapterParamMaxGas: 0.05,
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
    adapterParamMaxGas: 0.05,
  },
  base: {
    adapterParamMaxGas: 0.05,
  },
  scroll: {
    adapterParamMaxGas: 0.02,
  },
  opbnb: {
    adapterParamMaxGas: 0.05,
  },
  tenet: {
    adapterParamMaxGas: 0.05,
  },
  fuse: {
    adapterParamMaxGas: 0.05,
  },
  meter: {
    adapterParamMaxGas: 0.05,
  },
  klaytn: {
    adapterParamMaxGas: 0.05,
  },
  "arbitrum-nova": {
    adapterParamMaxGas: 0.05,
  },
  kava: {
    adapterParamMaxGas: 1,
  },
  aurora: {
    adapterParamMaxGas: 0.05,
  },
  astar: {
    adapterParamMaxGas: 0.05,
  },
  zkevm: {
    adapterParamMaxGas: 0.02,
  },
  manta: {
    adapterParamMaxGas: 0.05,
  },
  pgn: {
    adapterParamMaxGas: 0.05,
  },

  // Testnets
  mumbai: {
    adapterParamMaxGas: 0.05,
  },
  "optimism-goerli": {
    adapterParamMaxGas: 0.05,
  },
  "arbitrum-goerli": {
    adapterParamMaxGas: 0.05,
  },
  "base-testnet": {
    adapterParamMaxGas: 0.05,
  },
  "linea-testnet": {
    adapterParamMaxGas: 0.05,
  },
  "bsc-testnet": {
    adapterParamMaxGas: 0.05,
  },
  "zkevm-testnet": {
    adapterParamMaxGas: 0.05,
  },
  "mantle-testnet": {
    adapterParamMaxGas: 0.05,
  },
  "metis-testnet": {
    adapterParamMaxGas: 0.05,
  },
  "coreDao-testnet": {
    adapterParamMaxGas: 0.05,
  },
  sepolia: {
    adapterParamMaxGas: 0.1,
  },
  goerli: {
    adapterParamMaxGas: 0.05,
  },
};

export const maxGasValuesWormhole: MaxGasValues = {
  arbitrum: {
    refuel: 0.075,
  },
  avalanche: {
    refuel: 5,
  },
  bsc: {
    refuel: 0.6,
  },
  fantom: {
    refuel: 500,
  },
  optimism: {
    refuel: 0.075,
  },
  celo: {
    refuel: 250,
  },
  moonbeam: {
    refuel: 250,
  },
  polygon: {
    refuel: 250,
  },
  base: {
    refuel: 0.075,
  },
  klaytn: {
    refuel: 1000,
  },
};
