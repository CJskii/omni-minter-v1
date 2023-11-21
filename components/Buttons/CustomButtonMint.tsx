import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useNetwork, useAccount } from "wagmi";
import { handleErrors } from "../../utils/helpers/handleErrors";
import { handleMinting } from "../../utils/helpers/handleMinting";
import handleInteraction from "../../utils/helpers/handleInteraction";
import dynamic from "next/dynamic";
import { Network } from "../../types/network";

const MintedNFTModal = dynamic(() => import("../Modals/MintedNFTModal"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: false,
});

interface MintButtonProps {
  setLastMintId: (id: number) => void;
  mintNetwork: Network;
  isInvited: boolean;
  referredBy: string;
}

export const CustomButtonMint = (props: MintButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [minting, setMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState("");
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { chain } = useNetwork();
  const { address } = useAccount();
  const { setLastMintId, mintNetwork, isInvited, referredBy } = props;

  useEffect(() => {
    if (mintNetwork.name.toLowerCase() !== chain?.name.toLowerCase()) {
      setWrongNetwork(true);
    } else {
      setWrongNetwork(false);
    }
  }, [chain, mintNetwork]);

  const handleMint = async () => {
    if (mintNetwork.name.toLowerCase() !== chain?.name.toLowerCase())
      return alert("Please change network in your wallet\n\n:)");

    console.log(`Minting NFT on ${mintNetwork.name} network...`);

    try {
      setIsLoading(true);
      setShowMintModal(true);
      setMinting(true);

      const result = await handleMinting(mintNetwork);

      if (!result) {
        throw new Error("Failed to mint NFT");
      }

      const { mintedID, txHash } = result;

      setLastMintId(mintedID);
      setMintedNFT(mintedID.toString());
      setMinting(false);
      setIsLoading(false);

      console.log(`ONFT nftId: ${mintedID.toString()}`);

      if (address) {
        await handleInteraction({
          address,
          isInvited,
          referredBy,
          operation: "new_mint",
        });
      }

      setTxHash(txHash);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setMinting(false);
      handleErrors({ e, setErrorMessage });
    }
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;

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
                    mintNetwork={mintNetwork.name}
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
