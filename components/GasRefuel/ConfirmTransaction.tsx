import { ethers } from "ethers";
import { IConfirm } from "../../types/gas-refuel";
import { useEffect, useState } from "react";
import { coingeckoMapping } from "../../constants/tokenMappings";
import GasPriceDisplay from "./GasPriceDisplay";

const Confirm = ({
  toNetwork,
  fromNetwork,
  inputAmount,
  gasFee,
  setGasFee,
  handleConfirmButton,
  isLoading,
}: IConfirm) => {
  const [toNetworkPrice, setToNetworkPrice] = useState<number | null>(null);
  const [fromNetworkPrice, setFromNetworkPrice] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/fetchPrices")
      .then((res) => res.json())
      .then((data) => {
        const toPrice =
          data[coingeckoMapping[toNetwork.nativeCurrency.symbol.toLowerCase()]]
            ?.usd;
        const fromPrice =
          data[
            coingeckoMapping[fromNetwork.nativeCurrency.symbol.toLowerCase()]
          ]?.usd;
        setToNetworkPrice(toPrice);
        setFromNetworkPrice(fromPrice);
      });
  }, []);

  const estimatedUSDValue = toNetworkPrice
    ? (toNetworkPrice * Number(inputAmount)).toFixed(2)
    : null;
  const totalCost = Number(ethers.utils.formatEther(gasFee.toString())).toFixed(
    5
  );
  const totalCostUSD = fromNetworkPrice
    ? (fromNetworkPrice * Number(totalCost)).toFixed(2)
    : null;

  return (
    <>
      <div>
        <GasPriceDisplay
          label={`Receive on ${toNetwork.name}`}
          amount={inputAmount}
          currencySymbol={toNetwork.nativeCurrency.symbol}
          usdValue={estimatedUSDValue ? estimatedUSDValue : undefined}
        />

        <GasPriceDisplay
          label="Estimated total cost"
          amount={totalCost}
          currencySymbol={fromNetwork.nativeCurrency.symbol}
          usdValue={totalCostUSD ? totalCostUSD : undefined}
        />
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
