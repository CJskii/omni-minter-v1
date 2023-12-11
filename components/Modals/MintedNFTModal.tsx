import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MintedNFTModalProps } from "../../common/types/mintedNFT";

const MintedNFTModal = (props: MintedNFTModalProps) => {
  const {
    showMintModal,
    setShowMintModal,
    minting,
    mintedNFT,
    mintNetwork,
    txHash,
    setTxHash,
    errorMessage,
    setErrorMessage,
  } = props;
  const [metadata, setMetadata] = useState<{
    name?: string;
    description?: string;
    image?: string;
  } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dialogRef = useRef(null);
  const router = useRouter();
  const isWormhole = router.pathname.includes("wormhole");

  useEffect(() => {
    if (showMintModal && dialogRef.current) {
      (dialogRef as any).current.showModal();
    } else if (!showMintModal && dialogRef.current) {
      (dialogRef as any).current.close();
    }
  }, [showMintModal]);

  useEffect(() => {
    if (minting) {
      setImageLoaded(false);
    }
  }, [minting]);

  useEffect(() => {
    async function fetchData() {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(
          `/api/proxyMintly?id=${mintedNFT}&t=${timestamp}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              isWormhole: isWormhole ? "true" : "false",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          setMetadata(data);
          setImageLoaded(false);
        } else {
          console.error("Oops, we didn't get JSON!");
        }
      } catch (error) {
        console.error("Error fetching the metadata:", error);
      }
    }

    if (mintedNFT) {
      fetchData();
    }
  }, [mintedNFT]);

  const handleBridgeClick = () => {
    if (mintedNFT) {
      !isWormhole
        ? router.push(
            `/layerzero/onft-bridge?nftId=${mintedNFT}&network=${mintNetwork}`
          )
        : router.push(
            `/wormhole/nft-bridge?nftId=${mintedNFT}&network=${mintNetwork}`
          );
    }
  };

  const NFTDisplay = () => {
    if (!metadata) return null;

    return (
      <div className="card card-compact w-full max-w-xl bg-base-100 shadow-xl">
        <figure className="relative">
          {!imageLoaded && (
            <span className="loading loading-infinity w-[4rem] h-[4rem] absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"></span>
          )}
          <Image
            src={metadata.image ?? "/1.png"}
            alt={metadata.name ?? "Mintly ONFT #1"}
            layout="responsive"
            width={300}
            height={300}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{metadata.name}</h2>
          <p className="text-clip break-words text-[10px]">TX: {txHash}</p>
          <p>{metadata.description}</p>
          <div className="card-actions justify-end">
            <button
              onClick={handleBridgeClick}
              className="relative inline-flex items-center justify-center w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-200 hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none"
            >
              Bridge
            </button>
          </div>
        </div>
      </div>
    );
  };

  const displayContent = () => {
    if (minting)
      return (
        <span className="loading loading-infinity w-[4rem] h-[4rem]"></span>
      );
    if (errorMessage) return <p className="text-red-600 p-4">{errorMessage}</p>;
    if (mintedNFT) return <NFTDisplay />;
    return null;
  };

  return (
    <div>
      {showMintModal && (
        <dialog id="my_mint_modal" className="modal" ref={dialogRef}>
          <form
            method="dialog"
            className="modal-box p-0 flex justify-center items-center"
          >
            {displayContent()}
          </form>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => {
              setShowMintModal(false);
              setTxHash("");
              setErrorMessage("");
            }}
          />
        </dialog>
      )}
    </div>
  );
};

export default MintedNFTModal;
