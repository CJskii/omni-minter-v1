import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../constants/contractABI";
import { useAccount, useNetwork } from "wagmi";
import { getContractAddress } from "../utils/getConstants";
import getProviderOrSigner from "../utils/getProviderOrSigner";

interface MintButtonProps {
  setLastMintId: (id: number) => void;
  mintNetwork: string;
}

export const CustomButtonMint = (props: MintButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const { chain } = useNetwork();
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
    console.log("Custom Button Mint", selectedNetwork);
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
      console.log(`Fee: ${feeInEther} ETH`);

      // Mint NFT
      const nextMintId = await contract.nextMintId();
      console.log(`Next mint ID: ${nextMintId.toString()}`);
      let tx = await (
        await contract.mint({ value: ethers.utils.parseEther(feeInEther) })
      ).wait();

      let transactionReceipt = await provider.getTransactionReceipt(
        tx.transactionHash
      );
      console.log(transactionReceipt);
      const mintedID = parseInt(transactionReceipt.logs[0].topics[3], 16);
      setLastMintId(mintedID);
      setIsLoading(false);
      console.log(`ONFT nftId: ${mintedID.toString()}`);
      console.log(tx.transactionHash);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
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
                <div style={{ display: "flex", gap: 12, fontSize: "16px" }}>
                  <button
                    onClick={isLoading ? () => {} : handleMint}
                    disabled={wrongNetwork}
                    type="button"
                    className={`relative inline-flex items-center justify-center w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-100 hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none 
        ${wrongNetwork ? " cursor-not-allowed text-gray-600" : ""}`}
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
