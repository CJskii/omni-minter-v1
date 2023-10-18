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
};
