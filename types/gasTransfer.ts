import { Network } from "./network";
export interface GasTransferParams {
  fromNetwork: Network;
  toNetwork: Network;
  inputAmount: string;
  setIsLoading: (isLoading: boolean) => void;
  setGasFee: (gasFee: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setShowGasModal: (showGasModal: boolean) => void;
  setTxHash: (txHash: string) => void;
  setTransactionBlockNumber: (transactionBlockNumber: number) => void;
  gasFee: string;
}
