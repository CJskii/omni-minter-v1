import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

interface MintedNFTModalProps {
  showMintModal: boolean;
  setShowMintModal: (show: boolean) => void;
  minting: boolean;
  mintedNFT: any;
  mintNetwork: string;
}

const MintedNFTModal = (props: MintedNFTModalProps) => {
  const { showMintModal, setShowMintModal, minting, mintedNFT, mintNetwork } =
    props;
  const [metadata, setMetadata] = useState<{
    name?: string;
    description?: string;
    image?: string;
  } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dialogRef = useRef(null);
  const router = useRouter();

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
          `/api/proxyMintly?id=${mintedNFT}&t=${timestamp}`
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
      router.push(`/onft-bridge?nftId=${mintedNFT}&network=${mintNetwork}`);
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

  return (
    <div>
      {showMintModal && (
        <dialog id="my_mint_modal" className="modal" ref={dialogRef}>
          <form
            method="dialog"
            className="modal-box p-0 flex justify-center items-center"
          >
            {minting || (!mintedNFT && !imageLoaded) ? (
              <span className="loading loading-infinity w-[4rem] h-[4rem]"></span>
            ) : (
              <NFTDisplay />
            )}
          </form>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => setShowMintModal(false)}
          />
        </dialog>
      )}
    </div>
  );
};

export default MintedNFTModal;
