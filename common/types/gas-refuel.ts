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
  recipientAddress: string;
  type: string;
}

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
  recipentAddress: string;
  type: string;
}

export interface estimateGasParams {
  fromNetwork: Network;
  toNetwork: Network;
  inputAmount: string;
  setIsLoading: (isLoading: boolean) => void;
  setGasFee: (gasFee: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setShowGasModal: (showGasModal: boolean) => void;
  recipientAddress: string;
  type: string;
}

export interface IPreview {
  nativeCurrencySymbol: string;
  networkName: string;
  inputAmount: string;
  setInputAmount: (value: string) => void;
  handleMaxButton: () => void;
  handlePreviewClick: () => void;
}

export interface IConfirm {
  toNetwork: any;
  fromNetwork: any;
  inputAmount: string;
  gasFee: string;
  setGasFee: (value: string) => void;
  handleConfirmButton: () => void;
  isLoading: boolean;
}

export interface GasPriceProps {
  label: string;
  amount: string;
  currencySymbol: string;
  usdValue?: string;
}
