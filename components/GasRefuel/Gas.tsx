import { useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import { handleGasRefuel } from "../../utils/helpers/handleGasRefuel";
import { IoSwapHorizontalSharp } from "react-icons/io5";
import { useNetworkSelection } from "../../utils/hooks/useNetworkSelection";
import { activeChains } from "../../constants/chainsConfig";
import NetworkModal from "../Modals/NetworkModal";
import { Network } from "../../types/network";
import { getValidToNetworks } from "../../utils/getValidToNetworks";
import { estimateGasBridgeFee } from "../../utils/helpers/handleGasRefuel";
import { getContractAddress } from "../../utils/getConstants";
import { ethers } from "ethers";
import { getMaxGasValue } from "../../utils/getMaxGasValue";
import GasModal from "./GasModal";
import { handleErrors } from "../../utils/helpers/handleErrors";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { requestNetworkSwitch } from "../../utils/requestNetworkSwitch";

const Gas = () => {
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();

  const [inputAmount, setInputAmount] = useState("");
  const [gasFee, setGasFee] = useState("");
  const [showGasModal, setShowGasModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionBlockNumber, setTransactionBlockNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isValidToNetwork = (toNetwork: Network) => {
    const validToNetworks = getValidToNetworks(fromNetwork);
    return validToNetworks.includes(toNetwork.name);
  };

  const {
    selectedNetwork: fromNetwork,
    onNetworkSelect: setFromNetwork,
    searchTerm: fromSearchTerm,
    onSearchChange: setFromSearchTerm,
    filteredChains: fromFilteredChains,
    onClose: onFromClose,
  } = useNetworkSelection(activeChains[0]);

  const {
    selectedNetwork: toNetwork,
    onNetworkSelect: setToNetwork,
    searchTerm: toSearchTerm,
    onSearchChange: setToSearchTerm,
    filteredChains: toFilteredChains,
    onClose: onToClose,
  } = useNetworkSelection(activeChains[1], isValidToNetwork);

  const handleGas = async () => {
    setIsLoading(true);
    setShowGasModal(true);
    const CONTRACT_ADDRESS = getContractAddress(fromNetwork.name);
    let targetNetwork = toNetwork.name.toLowerCase();

    try {
      const result = await handleGasRefuel({
        CONTRACT_ADDRESS,
        targetNetwork,
        value: inputAmount,
        estimatedFee: gasFee,
      });

      if (!result) {
        throw new Error("Failed to mint NFT");
      }
      const { txHash, blockNumber } = result;
      setTxHash(txHash);
      setTransactionBlockNumber(blockNumber);
      setGasFee("");
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      handleErrors({ e, setErrorMessage });
      setIsLoading(false);
      setShowGasModal(true);
    }
  };

  const estimateGas = async () => {
    setIsLoading(true);
    try {
      const CONTRACT_ADDRESS = getContractAddress(fromNetwork.name);
      let targetNetwork = toNetwork.name.toLowerCase();

      console.log(CONTRACT_ADDRESS, targetNetwork, inputAmount);
      const estimatedFee = await estimateGasBridgeFee({
        CONTRACT_ADDRESS,
        targetNetwork,
        value: inputAmount,
      });

      setGasFee(estimatedFee);
      console.log(estimatedFee);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      handleErrors({ e, setErrorMessage });
      setShowGasModal(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // If the currently selected "To" network is not valid after the "From" network changes, reset it.
    if (!isValidToNetwork(toNetwork)) {
      const validNetworks = getValidToNetworks(fromNetwork);
      const defaultNetwork = activeChains.find(
        (chain) => chain.name === validNetworks[0]
      );
      defaultNetwork
        ? setToNetwork(defaultNetwork)
        : setToNetwork(activeChains[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromNetwork, toNetwork, setToNetwork]);

  useEffect(() => {
    setGasFee("");
  }, [fromNetwork, toNetwork]);

  const handleMaxButton = () => {
    const maxGas = getMaxGasValue(toNetwork.name);
    if (maxGas) {
      setInputAmount(maxGas.toString());
    }
  };

  const handlePreviewClick = async () => {
    setIsLoading(true);
    try {
      if (chain?.name !== fromNetwork.name) {
        await requestNetworkSwitch(fromNetwork.id, openChainModal);
      }
      await estimateGas();
    } catch (e) {
      console.error(e);
      handleErrors({ e, setErrorMessage });
      setShowGasModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
          <div className="md:w-full xl:max-w-2xl 2xl:max-w-2xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between lg:p-8">
            <GasModal
              showGasModal={showGasModal}
              setShowGasModal={setShowGasModal}
              txHash={txHash}
              setTxHash={setTxHash}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              isLoading={isLoading}
              data={{
                inputAmount,
                toNetwork,
                transactionBlockNumber,
              }}
            />
            <h2 className="text-xl font-bold leading-tight sm:text-4xl text-content-focus text-center">
              Gas Refuel
            </h2>
            <p className="text-sm text-center p-2">
              Note: this is experimental feature, please proceed with caution!
            </p>
            <p className="text-sm text-center">
              If you run into any issues please contact us in our{" "}
              <a
                className="text-yellow-400"
                href="https://discord.gg/VWbgEbF2Nf"
                title=""
                target="_blank"
              >
                Discord
              </a>
            </p>

            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4 py-4 px-2 mt-4 max-sm:flex max-sm:flex-col">
              <NetworkModal
                selectedNetwork={fromNetwork}
                onNetworkSelect={setFromNetwork}
                searchTerm={fromSearchTerm}
                onSearchChange={setFromSearchTerm}
                filteredChains={fromFilteredChains}
                onClose={onFromClose}
                dialogId="fromNetworkModal"
                title="From"
              />
              <div className="py-4 px-2 ">
                <IoSwapHorizontalSharp
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setFromNetwork(toNetwork);
                    setToNetwork(fromNetwork);
                  }}
                />
              </div>
              <NetworkModal
                selectedNetwork={toNetwork}
                onNetworkSelect={setToNetwork}
                searchTerm={toSearchTerm}
                onSearchChange={setToSearchTerm}
                filteredChains={toFilteredChains}
                onClose={onToClose}
                dialogId="toNetworkModal"
                title="To"
              />
            </div>

            {gasFee != "" ? (
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
                  onClick={handleGas}
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
            ) : (
              <>
                <p className="pt-5 pb-3">
                  Step 1: Input amount of ${toNetwork.nativeCurrency.symbol} to
                  receive on {toNetwork.name}
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gas;
