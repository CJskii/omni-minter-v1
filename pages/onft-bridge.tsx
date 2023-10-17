import { useRouter } from "next/router";
// import Bridging from "../components/Bridge/Bridging";
import dynamic from "next/dynamic";

const Bridging = dynamic(() => import("../components/Bridge/Bridging"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const ONFTBridge = () => {
  const router = useRouter();
  let nftId = router.query.nftId?.toString() || "";
  const mintNetwork = router.query.network?.toString() || "";

  return <Bridging passedNftId={nftId} mintNetwork={mintNetwork} />;
};

export default ONFTBridge;
