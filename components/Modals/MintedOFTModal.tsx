import { useEffect, useRef } from "react";

type MintedOFTModalProps = {
  setShowMintModal: (show: boolean) => void;
  showMintModal: boolean;
  txHash: string;
  setTxHash: (hash: string) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  isLoading: boolean;
  isMinting: boolean;
  userBalance: number;
};

const MintedOFTModal = (props: MintedOFTModalProps) => {
  const {
    setShowMintModal,
    showMintModal,
    txHash,
    setTxHash,
    errorMessage,
    setErrorMessage,
    isLoading,
    isMinting,
    userBalance,
  } = props;

  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (showMintModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!showMintModal && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showMintModal]);

  const SuccessDisplay = () => {
    if (!showMintModal) return null;
    return (
      <div className="card card-compact w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Successful Mint</h2>
          <p className="text-lg">
            {`Your new balance is ${
              isMinting ? (
                <span className="loading loading-ring loading-xs"></span>
              ) : (
                userBalance
              )
            } MIN`}
          </p>
          <p className="text-[sm]"></p>
          <p className="text-clip break-words text-[10px]">TX: {txHash}</p>

          <div className="card-actions justify-end">
            <button
              onClick={() => {
                if (dialogRef.current) {
                  dialogRef.current.close();
                }
                setShowMintModal(false);
                setTxHash("");
              }}
              className="relative inline-flex items-center justify-center w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-200 hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <dialog ref={dialogRef} id="oft_mint_modal" className="modal">
        <form
          method="dialog"
          className="modal-box p-0 flex justify-center items-center"
        >
          {isLoading && showMintModal ? (
            <span className="loading loading-infinity w-[4rem] h-[4rem]"></span>
          ) : errorMessage ? (
            <p className="text-red-600 p-4">{errorMessage}</p>
          ) : (
            <SuccessDisplay />
          )}
        </form>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            if (dialogRef.current) {
              dialogRef.current.close();
            }
            setShowMintModal(false);
            setTxHash("");
            setErrorMessage("");
          }}
        />
      </dialog>
    </div>
  );
};

export default MintedOFTModal;