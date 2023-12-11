import { IPreview } from "../../common/types/gas-refuel";

const Preview = ({
  nativeCurrencySymbol,
  networkName,
  inputAmount,
  setInputAmount,
  handleMaxButton,
  handlePreviewClick,
}: IPreview) => {
  return (
    <>
      <p className="pt-5 pb-3">
        Step 1: Input amount of ${nativeCurrencySymbol} to receive on{" "}
        {networkName}
      </p>
      <div className="w-full flex justify-center items-center gap-4 max-[400px]:flex-col">
        <input
          className="input input-bordered flex-grow"
          placeholder="Amount"
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
        <button
          className="btn btn-primary flex-shrink-0 w-1/3 max-w-[30%]"
          onClick={handleMaxButton}
        >
          Max
        </button>
      </div>
      <p className="pt-5 pb-3">Step 2: Check transaction details</p>
      <button
        className="btn btn-primary"
        onClick={handlePreviewClick}
        disabled={inputAmount == ""}
      >
        Preview
      </button>
    </>
  );
};

export default Preview;
