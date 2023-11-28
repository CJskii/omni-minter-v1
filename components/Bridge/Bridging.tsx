import { useState, useEffect } from "react";
import { getContractAddress } from "../../utils/getConstants";
import { useNetwork, useAccount } from "wagmi";
import { handleBridging } from "../../utils/helpers/handleBridging";
import { handleErrors } from "../../utils/helpers/handleErrors";
import handleInteraction from "../../utils/helpers/handleInteraction";
import { useNetworkSelection } from "../../utils/hooks/useNetworkSelection";
import { activeChains } from "../../constants/chainsConfig";
import { getValidToNetworks } from "../../utils/getValidToNetworks";
import { Network } from "../../types/network";
import dynamic from "next/dynamic";

const NetworkModal = dynamic(() => import("../Modals/NetworkModal"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const BridgingModal = dynamic(() => import("../Modals/BridgingModal"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const CustomButtonNetwork = dynamic(
  () => import("../Buttons/CustomButtonNetwork"),
  {
    loading: () => <span className="loading loading-dots loading-lg"></span>,
    ssr: true,
  }
);

const CustomButtonBridge = dynamic(
  () => import("../Buttons/CustomButtonBridge"),
  {
    loading: () => <span className="loading loading-dots loading-lg"></span>,
    ssr: true,
  }
);

interface BridgeProps {
  passedNftId: string;
  mintNetwork: string;
}

const Bridging = (props: BridgeProps) => {
  let { passedNftId } = props;
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const [nftId, setNftId] = useState("");
  const [showBridgingModal, setShowBridgingModal] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    checkNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromNetwork, toNetwork, setToNetwork]);

  useEffect(() => {
    passedNftId ? setNftId(passedNftId) : setNftId("");
  }, [passedNftId]);

  const checkNetwork = () => {
    if (chain?.name == fromNetwork.name) {
      setWrongNetwork(false);
    } else {
      setWrongNetwork(true);
    }
  };

  const handleBridge = async () => {
    const TOKEN_ID = nftId;
    if (!nftId || nftId === "") {
      alert("Please enter a valid NFT Id");
      return;
    }

    try {
      setIsLoading(true);
      setShowBridgingModal(true);
      console.log(
        `Sending NFT #${TOKEN_ID} from ${fromNetwork.name} to ${toNetwork.name}`
      );

      const result = await handleBridging({
        TOKEN_ID,
        fromNetwork,
        toNetwork,
      });

      const { txHash } = result;

      if (address) {
        handleInteraction({
          address,
          operation: "new_bridge",
        });
      }

      setNftId("");
      setIsLoading(false);
      setTxHash(txHash);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      handleErrors({ e, setErrorMessage });
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none bg">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
          <div className="md:w-full xl:max-w-lg 2xl:max-w-xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between lg:p-8">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl text-content-focus">
              Step 2: Bridge ONFT
            </h2>

            <div className="space-y-5">
              <BridgingModal
                showBridgingModal={showBridgingModal}
                isLoading={isLoading}
                setShowBridgingModal={setShowBridgingModal}
                txHash={txHash}
                setTxHash={setTxHash}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
              <div className="my-8">
                <CustomButtonNetwork mintNetwork={fromNetwork.name} />
              </div>

              {/* Select From Network */}
              <div>
                <label className="text-base font-medium text-natural-content">
                  Bridge From
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
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
                </div>
              </div>

              {/* Select To Network */}
              <div>
                <label className="text-base font-medium text-natural-content">
                  Bridge To
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
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
              </div>

              {/* Input NFT ID */}
              <div className="mt-2.5">
                <label className="text-base font-medium text-natural-content">
                  NFT ID
                </label>
                <input
                  type="number"
                  id="nftId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={nftId}
                  onChange={(e) => setNftId(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-3 space-y-3">
              <CustomButtonBridge
                isLoading={isLoading}
                wrongNetwork={wrongNetwork}
                nftId={nftId}
                handleBridge={handleBridge}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bridging;
