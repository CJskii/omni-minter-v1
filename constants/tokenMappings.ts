interface TokenMapping {
  [key: string]: string;
}

export const binanceMapping: TokenMapping = {
  eth: "ETHUSDT",
  bnb: "BNBUSDT",
  matic: "MATICUSDT",
  fantom: "FTMUSDT",
  avalanche: "AVAXUSDT",
  celo: "CELOUSDT",
  glmr: "GLMRUSDT",
  movr: "MOVRUSDT",
  one: "ONEUSDT",
};

export const coingeckoMapping: TokenMapping = {
  eth: "ethereum",
  bnb: "binancecoin",
  matic: "matic-network",
  ftm: "fantom",
  avax: "avalanche-2",
  celo: "celo",
  glmr: "moonbeam",
  movr: "moonriver",
  one: "harmony",
  mnt: "mantle",
  metis: "metis-token",
  core: "coredaoorg",
  canto: "canto",
  kava: "kava",
  astr: "astar",
  fuse: "fuse-network-token",
  mtr: "meter-stable",
  tenet: "tenet-1b000f7b-59cb-4e06-89ce-d62b32d362b9",
  klay: "klay-token",
};
