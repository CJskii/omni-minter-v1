export interface BridgingModalProps {
  showBridgingModal: boolean;
  setShowBridgingModal: (showBridgingModal: boolean) => void;
  isLoading: boolean;
  txHash: string;
  setTxHash: (txHash: string) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}
