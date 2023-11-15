import { useState, useEffect } from "react";
import { IoSwapHorizontalSharp } from "react-icons/io5";
import dynamic from "next/dynamic";
import { Network } from "../../types/network";
import { useNetworkSelection } from "../../utils/hooks/useNetworkSelection";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { getValidToNetworks } from "../../utils/getValidToNetworks";
import { useNetwork } from "wagmi";
import { activeChains } from "../../constants/chainsConfig";
import NetworkModal from "../Modals/NetworkModal";

const TokenBridge = () => {
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();

  const [inputAmount, setInputAmount] = useState("");
  const [gasFee, setGasFee] = useState("");
  const [showGasModal, setShowGasModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionBlockNumber, setTransactionBlockNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");

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
  } = useNetworkSelection(activeChains[0] as Network);

  const {
    selectedNetwork: toNetwork,
    onNetworkSelect: setToNetwork,
    searchTerm: toSearchTerm,
    onSearchChange: setToSearchTerm,
    filteredChains: toFilteredChains,
    onClose: onToClose,
  } = useNetworkSelection(activeChains[1] as Network, isValidToNetwork);

  useEffect(() => {
    // If the currently selected "To" network is not valid after the "From" network changes, reset it.
    if (!isValidToNetwork(toNetwork)) {
      const validNetworks = getValidToNetworks(fromNetwork);
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
    // await gasTransferRequest({
    //   fromNetwork,
    //   toNetwork,
    //   inputAmount,
    //   setIsLoading,
    //   setGasFee,
    //   setErrorMessage,
    //   setShowGasModal,
    //   setTxHash,
    //   setTransactionBlockNumber,
    //   gasFee,
    //   recipientAddress,
    // });
  };

  const handlePreviewClick = async () => {
    setIsLoading(true);
    // try {
    //   if (chain?.name !== fromNetwork.name) {
    //     await requestNetworkSwitch(fromNetwork.id, openChainModal);
    //   }
    //   await estimateGasRequest({
    //     fromNetwork,
    //     toNetwork,
    //     inputAmount,
    //     setIsLoading,
    //     setGasFee,
    //     setErrorMessage,
    //     setShowGasModal,
    //     recipientAddress,
    //   });
    // } catch (e) {
    //   console.error(e);
    //   handleErrors({ e, setErrorMessage });
    //   setShowGasModal(true);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex flex-col justify-between items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
          <div className="md:w-full xl:max-w-2xl 2xl:max-w-2xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between lg:p-8">
            {/* Modal */}
            <h2 className="text-xl font-bold leading-tight sm:text-4xl text-content-focus text-center">
              OFT
            </h2>

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

            <button className="btn btn-disabled">Confirm</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokenBridge;
