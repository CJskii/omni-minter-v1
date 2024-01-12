import { useState, useEffect } from "react";
import { IoSwapHorizontalSharp } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { Network } from "../../common/types/network";
import { useNetworkSelection } from "../../common/components/hooks/useNetworkSelection";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { getValidToNetworks } from "../../common/utils/getters/getValidToNetworks";
import { useNetwork } from "wagmi";
import { activeChains } from "../../constants/config/chainsConfig";
import NetworkModal from "../../common/components/elements/modals/NetworkModal";
import { handleMinting } from "../../common/utils/interaction/handlers/handleMinting";

const TokenBridge = ({
  contractProvider,
}: {
  contractProvider: {
    type: string;
    contract: any;
  };
}) => {
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
  const { type, contract } = contractProvider;

  const [showGasModal, setShowGasModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [transactionBlockNumber, setTransactionBlockNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mintAmount, setMintAmount] = useState("");
  const [bridgeAmount, setBridgeAmount] = useState("");

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
    fetchUserBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromNetwork, toNetwork, setToNetwork]);

  const fetchUserBalance = async () => {
    // const balance = await getBalance({
    //   network: fromNetwork,
    //   type,
    //   contract,
    // });
    // setBalance(balance);
  };

  const getBalance = async ({
    network,
    type,
    contract,
  }: {
    network: Network;
    type: string;
    contract: any;
  }) => {
    // const provider = getProvider(network);
    // const contractAddress = getContractAddress(type, network);
    // const contractInstance = getContractInstance(contract, provider);
    // const balance = await contractInstance.balanceOf(contractAddress);
    // return balance;
  };

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

  const handleMintButton = async () => {
    console.log("Minting");
    // const { mintedID, txHash } = await handleMinting({
    //   mintNetwork: fromNetwork,
    //   contractProvider,
    //   mintQuantity: mintAmount as any,
    // });

    // await mintRequest({
    //   fromNetwork,
    //   toNetwork,
    //   inputAmount,
    //   setIsLoading,
    //   setGasFee,
    //   setErrorMessage,
    //   setShowGasModal,
    //   setTxHash,
    //   setTransactionBlockNumber,
    //   recipientAddress,
    // });
  };

  const handleBridgeButton = async () => {
    console.log("Bridging");
    // await bridgeRequest({
    //   fromNetwork,
    //   toNetwork,
    //   inputAmount,
    //   setIsLoading,
    //   setGasFee,
    //   setErrorMessage,
    //   setShowGasModal,
    //   setTxHash,
    //   setTransactionBlockNumber,
    //   recipientAddress,
    // });
  };

  const handleMaxButton = async () => {
    console.log("Maxing");
  };

  const handleRefreshButton = async () => {
    console.log("Refreshing");
  };

  return (
    <div className="flex flex-col justify-between items-center min-w-full ">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
          <div className="md:w-full xl:max-w-2xl 2xl:max-w-2xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between lg:p-8">
            {/* Modal */}
            <h2 className="text-xl font-bold leading-tight sm:text-4xl text-content-focus text-center">
              OFT Bridge
            </h2>
            <div className="flex justify-center items-center flex-col">
              <p className="text-center py-2">Your Balance: 0</p>
              <IoIosRefresh
                className="hover:cursor-pointer hover:animate-spin"
                onClick={handleRefreshButton}
              />
            </div>

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
            <div className="flex justify-center items-start flex-col py-2">
              <label htmlFor="receipentAddress" className="pb-1">
                Step 1: Mint
              </label>{" "}
              <div className="flex justify-center items-center gap-2 w-full">
                <input
                  type="number"
                  id="recipientAddress"
                  placeholder="Enter amount to mint"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  className="input input-bordered flex-grow"
                />
                <button
                  className="btn btn-primary w-[20%]"
                  onClick={handleMintButton}
                >
                  Mint
                </button>
              </div>
            </div>

            <div className="flex justify-center items-start flex-col py-2">
              <label htmlFor="receipentAddress" className="pb-1">
                Step 2: Bridge
              </label>

              <div className="flex justify-center items-center gap-2 w-full">
                <input
                  type="number"
                  id="recipientAddress"
                  placeholder="Enter amount to bridge"
                  value={bridgeAmount}
                  onChange={(e) => setBridgeAmount(e.target.value)}
                  className="input input-bordered flex-grow"
                />
                <button
                  className="btn btn-primary w-[20%]"
                  onClick={handleMaxButton}
                >
                  Max
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary mt-2"
              onClick={handleBridgeButton}
            >
              Send it
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokenBridge;
