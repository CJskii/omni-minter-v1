import { ethers } from "ethers";
import { IConfirm } from "../../types/gas-refuel";

const Confirm = ({
  toNetwork,
  fromNetwork,
  inputAmount,
  gasFee,
  setGasFee,
  handleConfirmButton,
  isLoading,
}: IConfirm) => {
  return (
    <>
      <div>
        <p>
          Estimated to receive on {toNetwork.name} {inputAmount}{" "}
          {toNetwork.nativeCurrency.symbol}
        </p>
        <p>
          Estimated total cost{" "}
          {(
            Number(ethers.utils.formatEther(gasFee.toString())) +
            Number(inputAmount)
          ).toFixed(5)}{" "}
          {fromNetwork.nativeCurrency.symbol}
        </p>
      </div>
      <p className="pt-5 pb-3">Step 3: Confirm transaction</p>

      <button
        className="btn btn-primary"
        onClick={handleConfirmButton}
        disabled={isLoading ? true : false}
      >
        {" "}
        Confirm{" "}
      </button>
      <button
        className="btn btn-primary mt-2"
        onClick={() => {
          setGasFee("");
        }}
      >
        Return
      </button>
    </>
  );
};

export default Confirm;
