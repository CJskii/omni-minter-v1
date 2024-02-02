import { useState, useEffect } from "react";
import { IoSwapHorizontalSharp } from "react-icons/io5";
import { Network } from "../../common/types/network";
import { useNetworkSelection } from "../../common/components/hooks/useNetworkSelection";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { getValidToNetworks } from "../../common/utils/getters/getValidToNetworks";
import { useNetwork, useAccount } from "wagmi";
import { activeChains } from "../../constants/config/chainsConfig";
import { handleMinting } from "../../common/utils/interaction/handlers/handleMinting";
import { handleBridging } from "../../common/utils/interaction/handlers/handleBridging";
import { handleErrors } from "../../common/utils/interaction/handlers/handleErrors";
import { ethers } from "ethers";
import { requestNetworkSwitch } from "../../common/utils/requestNetworkSwitch";
import NetworkModal from "../../common/components/elements/modals/NetworkModal";
import MintTokenModal from "../Modals/MintedTokenModal";
import BridgeTokenModal from "../Modals/BridgeTokenModal";
import Step from "./Step";
import BridgeOFTButton from "../Buttons/CustomButtonOFTBridge";
import { getBalance } from "../../common/utils/getters/getBalance";

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
  const [showBridgingModal, setShowBridgingModal] = useState(false);
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
      getUserBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageLoaded, fromNetwork, toNetwork, setToNetwork]);

  const getUserBalance = async () => {
    if (!fromNetwork.deployedContracts || !address) return;
    try {
      const balanceInWei = await getBalance({
        abi: fromNetwork.deployedContracts[type][contract].ABI,
        walletAddress: address,
        contractAddress: fromNetwork.deployedContracts[type][contract].address,
      });

      const balanceInEther = ethers.utils.formatEther(balanceInWei);

      setUserBalance(Number(balanceInEther));
    } catch (e) {
      console.error(e);
    }
  };

  const handleMintButton = async () => {
    if (fromNetwork.name.toLowerCase() !== chain?.name.toLowerCase())
      return requestNetworkSwitch(fromNetwork.id, openChainModal);

    console.log(`Minting ${mintAmount} MIN on ${fromNetwork.name} network...`);

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
      const newBalance = userBalance > 0 ? userBalance + mintedID : mintedID;

      setTxHash(txHash);
      setUserBalance(Number(newBalance));
      setIsMinting(false);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      handleErrors({ e, setErrorMessage });
      setShowMintModal(true);
      setIsMinting(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBridgeButton = async () => {
    if (fromNetwork.name.toLowerCase() !== chain?.name.toLowerCase())
      return requestNetworkSwitch(fromNetwork.id, openChainModal);

    if (!address) return alert("Please connect your wallet\n\n:)");

    console.log(
      `Bridging ${bridgeAmount} MIN on ${fromNetwork.name} network...`
    );

    try {
      setIsLoading(true);
      setShowBridgingModal(true);
      setIsBridging(true);
      if (Number(bridgeAmount) > userBalance)
        throw new Error("insufficient OFT balance for transfer");

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

      const { hash } = result;
      const newBalance = userBalance - Number(bridgeAmount);

      setTxHash(hash);
      setUserBalance(newBalance > 0 ? newBalance : 0);
      setIsBridging(false);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      handleErrors({ e, setErrorMessage });
      setShowBridgingModal(true);
      setIsBridging(false);
    } finally {
      setIsLoading(false);
    }
  };

  const mintModalProps = {
    setShowMintModal,
    showMintModal,
    txHash,
    setTxHash,
    errorMessage,
    setErrorMessage,
    isLoading,
    isMinting,
    handleMintButton,
    userBalance,
    type,
  };

  const bridgeModalProps = {
    setShowBridgingModal,
    showBridgingModal,
    txHash,
    setTxHash,
    errorMessage,
    setErrorMessage,
    isLoading,
    isBridging,
    quantity: bridgeAmount,
    toNetwork: toNetwork.name,
    type,
  };

  const step1Props = {
    label: "Step 1: Mint",
    placeholder: "Enter amount to mint",
    value: mintAmount,
    onChange: setMintAmount,
    buttonLabel: "Mint",
    onClick: handleMintButton,
    disabled: !mintAmount,
    isLoading: isMinting,
  };

  const step2Props = {
    label: "Step 2: Bridge",
    placeholder: "Enter amount to bridge",
    value: bridgeAmount,
    onChange: setBridgeAmount,
    buttonLabel: "Max",
    onClick: () => setBridgeAmount(userBalance.toString()),
    disabled: !userBalance,
    isLoading: isBridging,
  };

  const bridgeButtonProps = {
    onClick: handleBridgeButton,
    disabled: !bridgeAmount,
    isBridging: isBridging,
    fromNetwork: fromNetwork.name,
    chain: chain?.name,
  };

  return (
    <div className="flex flex-col justify-between items-center min-w-full ">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
          <div className="md:w-full xl:max-w-2xl 2xl:max-w-2xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between lg:p-8">
            <MintTokenModal {...mintModalProps} />
            <BridgeTokenModal {...bridgeModalProps} />
            <h2 className="text-xl font-bold leading-tight sm:text-4xl text-content-focus text-center">
              {type === "wormhole" ? "wERC20" : "OFT"} Bridge
            </h2>
            <div className="flex justify-center items-center flex-col">
              <p className="text-center py-2">Your Balance: {userBalance}</p>
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

            <Step {...step1Props} />
            <Step {...step2Props} />
            <BridgeOFTButton {...bridgeButtonProps} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokenBridge;
