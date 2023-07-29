import Bridge from "./Bridge";
import Mint from "./Mint";
import { useState } from "react";
import NetworkSelection from "./NetworkSelection";

const Main = () => {
  const [mintId, setMintId] = useState(0);
  const [fromNetwork, setFromNetwork] = useState(""); // State for "From" network selection
  const [toNetwork, setToNetwork] = useState(""); // State for "To" network selection
  return (
    <div className="flex flex-col justify-betweeen items-center min-w-full">
      <h1 className="text-xl text-primary">ONFT BRIDGE</h1>
      <NetworkSelection
        setFromNetwork={setFromNetwork}
        setToNetwork={setToNetwork}
        toNetwork={toNetwork}
        fromNetwork={fromNetwork}
      />
      <Mint setMintId={setMintId} fromNetwork={fromNetwork} />
      <Bridge
        mintId={mintId}
        setMintId={setMintId}
        fromNetwork={fromNetwork}
        toNetwork={toNetwork}
      />
    </div>
  );
};

export default Main;
