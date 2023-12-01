import { Network } from "../../types/network";

type TokenIdProps = {
  txHash: string;
  mintNetwork: Network;
  provider: any;
};

export const getTokenId = async ({
  txHash,
  mintNetwork,
  provider,
}: TokenIdProps) => {
  let transactionReceipt = await provider.getTransactionReceipt(txHash);

  if (mintNetwork.name.toLowerCase() === "zksync era") {
    return parseInt(transactionReceipt.logs[3].topics[3], 16);
  } else if (
    mintNetwork.name.toLowerCase() != "polygon" &&
    mintNetwork.name.toLowerCase() != "polygon mumbai"
  ) {
    return parseInt(transactionReceipt.logs[0].topics[3], 16);
  } else {
    return parseInt(transactionReceipt.logs[1].topics[3], 16);
  }
};
