import { useNetwork } from "wagmi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { IoSwapHorizontalSharp } from "react-icons/io5";
import dynamic from "next/dynamic";
import { Network } from "../../common/types/network";
import { useNetworkSelection } from "../../common/components/hooks/useNetworkSelection";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { activeChains } from "../../constants/config/chainsConfig";
import { estimateGasRequest } from "../../common/utils/interaction/handlers/estimateGas";
import { gasTransferRequest } from "../../common/utils/interaction/handlers/handleGasRefuel";
import { getValidToNetworks } from "../../common/utils/getters/getValidToNetworks";
import { getMaxGasValue } from "../../common/utils/getters/getMaxGasValue";
import { requestNetworkSwitch } from "../../common/utils/requestNetworkSwitch";
import { handleErrors } from "../../common/utils/interaction/handlers/handleErrors";
import Preview from "./Preview";
import Confirm from "./ConfirmTransaction";
import DiscordLink from "../../common/components/elements/DiscordLink";

const NetworkModal = dynamic(
  () => import("../../common/components/elements/modals/NetworkModal"),
  {
    loading: () => <span className="loading loading-dots loading-lg"></span>,
    ssr: true,
  }
);

const GasModal = dynamic(() => import("../Modals/GasModal"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const Gas = ({
  contractProvider,
}: {
  contractProvider: {
    type: string;
    contract: string;
  };
}) => {
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
  const { type, contract } = contractProvider;

  const [inputAmount, setInputAmount] = useState("");
  const [gasFee, setGasFee] = useState("");
  const [showGasModal, setShowGasModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionBlockNumber, setTransactionBlockNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");

  const isValidToNetwork = (toNetwork: Network) => {
    const validToNetworks = getValidToNetworks({
      fromNetwork,
      type,
      contract,
    }) as string[];
    return validToNetworks.includes(toNetwork.name);
  };

  const {
    selectedNetwork: fromNetwork,
    onNetworkSelect: setFromNetwork,
    searchTerm: fromSearchTerm,
    onSearchChange: setFromSearchTerm,
    filteredChains: fromFilteredChains,
    onClose: onFromClose,
  } = useNetworkSelection(contractProvider);

  const {
    selectedNetwork: toNetwork,
    onNetworkSelect: setToNetwork,
    searchTerm: toSearchTerm,
    onSearchChange: setToSearchTerm,
    filteredChains: toFilteredChains,
    onClose: onToClose,
  } = useNetworkSelection(contractProvider, isValidToNetwork);

  useEffect(() => {
    // If the currently selected "To" network is not valid after the "From" network changes, reset it.
    if (!isValidToNetwork(toNetwork)) {
      const validNetworks = getValidToNetworks({
        fromNetwork,
        type,
        contract,
      }) as string[];
      const defaultNetwork = activeChains.find(
        (chain) => chain.name === validNetworks[0]
      );
      defaultNetwork
        ? setToNetwork(defaultNetwork as Network)
        : setToNetwork(activeChains[0] as Network);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromNetwork, toNetwork, setToNetwork]);

  useEffect(() => {
    setGasFee("");
  }, [fromNetwork, toNetwork]);

  const handleConfirmButton = async () => {
    await gasTransferRequest({
      fromNetwork,
      toNetwork,
      inputAmount,
      setIsLoading,
      setGasFee,
      setErrorMessage,
      setShowGasModal,
      setTxHash,
      setTransactionBlockNumber,
      gasFee,
      recipientAddress,
      type,
    });
  };

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
      await estimateGasRequest({
        fromNetwork,
        toNetwork,
        inputAmount,
        setIsLoading,
        setGasFee,
        setErrorMessage,
        setShowGasModal,
        recipientAddress,
        type,
      });
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
              recipentAddress={recipientAddress}
            />
            <h2 className="text-xl font-bold leading-tight sm:text-4xl text-content-focus text-center">
              Gas Refuel
            </h2>
            <p className="text-sm text-center py-2">
              If you run into any issues please contact us in our{" "}
              <DiscordLink />
            </p>
            <span className="text-xs text-center">
              {`Excess of unused gas will be refunded to your ${toNetwork.name} address.`}
            </span>

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

            {gasFee === "" && type != "wormhole" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="recipientAddress">
                  Sending to a friend? (optional):
                </label>
                <input
                  type="text"
                  id="recipientAddress"
                  placeholder="Enter recipient's Ethereum address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="input input-bordered flex-grow"
                />
              </div>
            )}

            {gasFee != "" ? (
              <Confirm
                toNetwork={toNetwork}
                fromNetwork={fromNetwork}
                inputAmount={inputAmount}
                gasFee={gasFee}
                setGasFee={setGasFee}
                handleConfirmButton={handleConfirmButton}
                isLoading={isLoading}
              />
            ) : (
              <Preview
                nativeCurrencySymbol={toNetwork.nativeCurrency.symbol}
                networkName={toNetwork.name}
                inputAmount={inputAmount}
                setInputAmount={setInputAmount}
                handleMaxButton={handleMaxButton}
                handlePreviewClick={handlePreviewClick}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gas;
