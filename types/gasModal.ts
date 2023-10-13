import { Network } from "./network";

export interface GasModalProps {
  showGasModal: boolean;
  setShowGasModal: (show: boolean) => void;
  isLoading: boolean;
  txHash: string;
  setTxHash: (txHash: string) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  data: {
    toNetwork: Network;
    inputAmount: string;
    transactionBlockNumber: number;
  };
}
