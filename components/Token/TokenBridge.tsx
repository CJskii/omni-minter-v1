import { useState, useEffect } from "react";
import { IoSwapHorizontalSharp } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { Network } from "../../common/types/network";
import { useNetworkSelection } from "../../common/components/hooks/useNetworkSelection";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { getValidToNetworks } from "../../common/utils/getters/getValidToNetworks";
import { useNetwork, useAccount } from "wagmi";
import { activeChains } from "../../constants/config/chainsConfig";
import NetworkModal from "../../common/components/elements/modals/NetworkModal";
import { handleMinting } from "../../common/utils/interaction/handlers/handleMinting";
import { handleBridging } from "../../common/utils/interaction/handlers/handleBridging";
import { handleErrors } from "../../common/utils/interaction/handlers/handleErrors";
import getProviderOrSigner from "../../common/utils/getters/getProviderOrSigner";
import { Contract, ethers } from "ethers";
import { requestNetworkSwitch } from "../../common/utils/requestNetworkSwitch";
import MintedOFTModal from "../Modals/MintedOFTModal";

const TokenBridge = ({
  contractProvider,
}: {
  contractProvider: {
    type: string;
    contract: any;
  };
}) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { openChainModal } = useChainModal();
  const { type, contract } = contractProvider;

  const [showMintModal, setShowMintModal] = useState(false);
  const [showBridgeModal, setShowBridgeModal] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mintAmount, setMintAmount] = useState("");
  const [bridgeAmount, setBridgeAmount] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [isBridging, setIsBridging] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

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
    setIsPageLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromNetwork, toNetwork, setToNetwork]);

  useEffect(() => {
    if (isPageLoaded && fromNetwork.name == chain?.name) {
      console.log("fetching user balance");
      fetchUserBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageLoaded, fromNetwork, toNetwork, setToNetwork]);

  const fetchUserBalance = async () => {
    if (!fromNetwork.deployedContracts || !address) return;
    try {
      const balanceInWei = await getBalance({
        abi: fromNetwork.deployedContracts.layerzero.OFT.ABI,
        walletAddress: address,
        contractAddress: fromNetwork.deployedContracts.layerzero.OFT.address,
      });

      setUserBalance(Number(balanceInWei));
    } catch (e) {
      console.error(e);
    }
  };

  const getBalance = async ({
    abi,
    walletAddress,
    contractAddress,
  }: {
    abi: any;
    walletAddress: string;
    contractAddress: string;
  }) => {
    try {
      const provider = await getProviderOrSigner();
      const contractInstance = new Contract(contractAddress, abi, provider);
      const balance = await contractInstance.balanceOf(walletAddress);
      return balance.toString();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMintButton = async () => {
    if (fromNetwork.name.toLowerCase() !== chain?.name.toLowerCase())
      return requestNetworkSwitch(fromNetwork.id, openChainModal);

    console.log(
      `Minting ${mintAmount} tokens on ${fromNetwork.name} network...`
    );

    try {
      setIsLoading(true);
      setShowMintModal(true);
      setIsMinting(true);

      const result = await handleMinting({
        mintNetwork: fromNetwork,
        contractProvider,
        mintQuantity: mintAmount as any,
      });

      if (!result) {
        throw new Error("Failed to mint NFT");
      }

      const { mintedID, txHash } = result;

      setIsMinting(false);
      setIsLoading(false);
      const newBalance = userBalance > 0 ? userBalance + mintedID : mintedID;
      setUserBalance(Number(newBalance));

      // TODO: Add interaction with the database

      // if (address) {
      //   await handleInteraction({
      //     address,
      //     isInvited,
      //     referredBy,
      //     operation: "new_mint",
      //   });
      // }

      setTxHash(txHash);
    } catch (e) {
      console.error(e);
      handleErrors({ e, setErrorMessage });
      setShowMintModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBridgeButton = async () => {
    if (fromNetwork.name.toLowerCase() !== chain?.name.toLowerCase())
      return requestNetworkSwitch(fromNetwork.id, openChainModal);

    if (!address) return alert("Please connect your wallet\n\n:)");

    console.log(
      `Bridging ${bridgeAmount} tokens on ${fromNetwork.name} network...`
    );

    try {
      setIsLoading(true);
      setShowBridgeModal(true);
      setIsBridging(true);

      const result = await handleBridging({
        TOKEN_ID: bridgeAmount,
        fromNetwork,
        toNetwork,
        contractProvider,
        address,
      });

      if (!result) {
        throw new Error("Failed to mint NFT");
      }

      const { txHash } = result;

      setIsBridging(false);
      setIsLoading(false);
      const newBalance = userBalance - Number(bridgeAmount);
      setUserBalance(newBalance > 0 ? newBalance : 0);

      // TODO: Add interaction with the database

      // if (address) {
      //   await handleInteraction({
      //     address,
      //     isInvited,
      //     referredBy,
      //     operation: "new_mint",
      //   });
      // }

      setTxHash(txHash);
    } catch (e) {
      console.error(e);
      handleErrors({ e, setErrorMessage });
      setShowBridgeModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshButton = async () => {
    await fetchUserBalance();
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
              <p className="text-center py-2">Your Balance: {userBalance}</p>
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
                  onClick={() => setBridgeAmount(userBalance.toString())}
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
