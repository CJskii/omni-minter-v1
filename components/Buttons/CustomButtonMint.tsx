import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import { useNetwork } from "wagmi";
import { getContractAddress } from "../../utils/getConstants";
import getProviderOrSigner from "../../utils/getProviderOrSigner";
import MintedNFTModal from "../Minter/MintedNFTModal";
import { updateMintData } from "../../utils/api/mintAPI";
import { useAccount } from "wagmi";

interface MintButtonProps {
  setLastMintId: (id: number) => void;
  mintNetwork: string;
}

export const CustomButtonMint = (props: MintButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [minting, setMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState("");
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { chain } = useNetwork();
  const { address } = useAccount();
  const { setLastMintId, mintNetwork } = props;

  useEffect(() => {
    setSelectedNetwork(mintNetwork);
  }, [mintNetwork]);

  useEffect(() => {
    if (mintNetwork.toLowerCase() !== chain?.name.toLowerCase()) {
      setWrongNetwork(true);
    } else {
      setWrongNetwork(false);
    }
  }, [chain, mintNetwork]);

  const handleMint = async () => {
    if (mintNetwork.toLowerCase() !== chain?.name.toLowerCase())
      return alert("Please change network in your wallet\n\n:)");

    console.log(`Minting NFT on ${mintNetwork} network...`);
    const CONTRACT_ADDRESS = getContractAddress(mintNetwork);

    try {
      // Initiate provider and signer
      const provider = await getProviderOrSigner();
      const signer = await getProviderOrSigner(true);
      setIsLoading(true);
      if (!(provider instanceof ethers.providers.Web3Provider)) {
        console.error("Provider is not an instance of Web3Provider");
        return;
      }

      // Initiate contract instance and get fee
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const contractFeeInWei = await contract.fee();
      const feeInEther = ethers.utils.formatEther(contractFeeInWei);
      console.log(`Fee: ${feeInEther}`);

      // Mint NFT

      const nextMintId = await contract.nextMintId();
      console.log(`Next mint ID: ${nextMintId.toString()}`);
      setShowMintModal(true);
      setMinting(true);

      let tx = await (
        await contract.mint({ value: ethers.utils.parseEther(feeInEther) })
      ).wait();

      let transactionReceipt = await provider.getTransactionReceipt(
        tx.transactionHash
      );
      // console.log(transactionReceipt);

      let mintedID;

      if (
        chain.name.toLowerCase() != "polygon" &&
        chain.name.toLowerCase() != "polygon mumbai"
      ) {
        mintedID = parseInt(transactionReceipt.logs[0].topics[3], 16);
      } else {
        mintedID = parseInt(transactionReceipt.logs[1].topics[3], 16);
      }

      setLastMintId(mintedID);
      setMintedNFT(mintedID.toString());
      setMinting(false);
      setIsLoading(false);
      console.log(`ONFT nftId: ${mintedID.toString()}`);
      if (address)
        updateMintData(address).then((response) => {
          if (response.status === 200) {
            console.log("Mint data updated");
          } else {
            console.log("Mint data update failed");
            console.log(response);
          }
        });

      setTxHash(tx.transactionHash);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setMinting(false);
      const dataMessage = (e as any).data?.message;
      const genericMessage = (e as any)?.message;
      if (dataMessage) {
        if (dataMessage.includes("insufficient funds")) {
          return setErrorMessage(
            "You have insufficient funds to complete this transaction."
          );
        } else if (dataMessage.includes("execution reverted")) {
          return setErrorMessage(
            "Transaction execution was reverted. Please check the transaction details."
          );
        } else {
          return setErrorMessage(dataMessage);
        }
      } else if (genericMessage) {
        if (genericMessage.includes("insufficient funds")) {
          return setErrorMessage(
            "You have insufficient funds to complete this transaction."
          );
        } else if (genericMessage.includes("ERC721: invalid token ID")) {
          return setErrorMessage(
            "Invalid ERC721 token ID provided. Please check and try again."
          );
        } else if (genericMessage.includes("execution reverted")) {
          return setErrorMessage(
            "Transaction execution was reverted. Please check the transaction details."
          );
        } else {
          return setErrorMessage("An error occurred");
        }
      } else {
        return setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            className=" "
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold transition-all duration-200  border-[1px] border-accent hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none focus:border-accent-focus"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="text-lg play-btn px-[1rem] py-3 cursor-pointer animate-text bg-red-500 rounded relative inline-flex items-center justify-center w-full font-semibold transition-all duration-200  border-[1px] border-base-100 hover:opacity-80 focus:opacity-80 hover:text-content focus:text-gray-200 focus:outline-none"
                  >
                    Wrong Network
                  </button>
                );
              }
              return (
                <div
                  style={{
                    display: "flex",
                    fontSize: "16px",
                  }}
                >
                  <MintedNFTModal
                    mintedNFT={mintedNFT}
                    showMintModal={showMintModal}
                    setShowMintModal={setShowMintModal}
                    minting={minting}
                    mintNetwork={mintNetwork}
                    txHash={txHash}
                    setTxHash={setTxHash}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                  />
                  <button
                    onClick={isLoading || wrongNetwork ? () => {} : handleMint}
                    disabled={wrongNetwork}
                    type="button"
                    className={`relative inline-flex items-center justify-center w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-100 hover:opacity-80
      ${
        wrongNetwork
          ? " cursor-not-allowed text-gray-700 bg-base-100 border-base-100"
          : " focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none"
      }`}
                  >
                    {isLoading ? (
                      <span className="loading loading-infinity loading-md"></span>
                    ) : (
                      "Mint"
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default CustomButtonMint;
