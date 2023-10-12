import { useRouter } from "next/router";
import Bridging from "../components/Bridge/Bridging";
const ONFTBridge = () => {
  const router = useRouter();
  let nftId = router.query.nftId?.toString() || "";
  const mintNetwork = router.query.network?.toString() || "";

  return <Bridging passedNftId={nftId} mintNetwork={mintNetwork} />;
};

export default ONFTBridge;
