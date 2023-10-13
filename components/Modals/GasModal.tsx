import { useEffect, useRef } from "react";
import { GasModalProps } from "../../types/gasModal";

const GasModal = (props: GasModalProps) => {
  const {
    showGasModal,
    setShowGasModal,
    isLoading,
    txHash,
    setTxHash,
    errorMessage,
    setErrorMessage,
  } = props;

  const { toNetwork, inputAmount, transactionBlockNumber } = props.data;
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    if (showGasModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!showGasModal && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showGasModal]);

  const SuccessDisplay = () => {
    if (!showGasModal) return null;
    return (
      <div className="card card-compact w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Successful Bridging</h2>
          <p className="text-lg">
            You will receive {inputAmount} ${toNetwork.nativeCurrency.symbol}{" "}
            shortly.
          </p>
          <p className="text-[sm]">
            Transaction will be included in block{" "}
            <strong>{transactionBlockNumber}</strong>
          </p>
          <p className="text-clip break-words text-[10px]">TX: {txHash}</p>

          <div className="card-actions justify-end">
            <button
              onClick={() => {
                if (dialogRef.current) {
                  dialogRef.current.close();
                }
                setShowGasModal(false);
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
      <dialog ref={dialogRef} id="my_mint_modal" className="modal">
        <form
          method="dialog"
          className="modal-box p-0 flex justify-center items-center"
        >
          {isLoading && showGasModal ? (
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
            setShowGasModal(false);
            setTxHash("");
            setErrorMessage("");
          }}
        />
      </dialog>
    </div>
  );
};

export default GasModal;
