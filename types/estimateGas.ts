import { Network } from "./network";
export interface estimateGasParams {
  fromNetwork: Network;
  toNetwork: Network;
  inputAmount: string;
  setIsLoading: (isLoading: boolean) => void;
  setGasFee: (gasFee: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setShowGasModal: (showGasModal: boolean) => void;
}
