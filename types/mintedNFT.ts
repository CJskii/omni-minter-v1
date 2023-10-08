export interface MintedNFTModalProps {
  showMintModal: boolean;
  setShowMintModal: (show: boolean) => void;
  minting: boolean;
  mintedNFT: any;
  mintNetwork: string;
  txHash: string;
  setTxHash: (txHash: string) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}
