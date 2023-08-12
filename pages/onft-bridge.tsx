import { useRouter } from "next/router";
import { useState } from "react";
import Bridging from "../components/Bridge/Bridging";
const ONFTBridge = () => {
  const router = useRouter();
  let nftId = router.query.nftId?.toString() || "";
  const mintNetwork = router.query.network?.toString() || "";

  const [passedNftId, setPassedNftId] = useState(nftId);

  const onBridgeComplete = () => {
    setPassedNftId("");
  };

  return (
    <Bridging
      passedNftId={passedNftId}
      mintNetwork={mintNetwork}
      onBridgeComplete={onBridgeComplete}
    />
  );
};

export default ONFTBridge;
