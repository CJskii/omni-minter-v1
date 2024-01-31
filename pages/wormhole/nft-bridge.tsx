import { useRouter } from "next/router";
// import Bridging from "../components/Bridge/Bridging";
import dynamic from "next/dynamic";
import HeadComponent from "../../common/components/elements/HeadComponent";

const Bridging = dynamic(() => import("../../components/Bridge/Bridging"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const ONFTBridge = () => {
  const router = useRouter();
  let nftId = router.query.nftId?.toString() || "";
  const mintNetwork = router.query.network?.toString() || "";

  return (
    <>
      <HeadComponent
        title="Mintly: wNFT Bridge - Seamlessly Bridge Your Wormhole Non-Fungible Tokens (wNFTs) with Mintly's Advanced Wormhole Bridge"
        description="Seamlessly bridge your Wormhole Non-Fungible Tokens (wNFTs) with Mintly's advanced Wormhole Bridge. Experience the ease of cross-chain transfers, enhancing your digital asset's interoperability through Wormhole."
      />
      <Bridging
        passedNftId={nftId}
        mintNetwork={mintNetwork}
        contractProvider={{ type: "wormhole", contract: "W_NFT" }}
        stepDescription={"Bridge wNFT"}
      />{" "}
    </>
  );
};

export default ONFTBridge;
