import dynamic from "next/dynamic";
import HeadComponent from "../components/HeadComponent";

const Gas = dynamic(() => import("../components/GasRefuel/Gas"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const GasRefuel = () => {
  return (
    <>
      <HeadComponent
        title="Mintly: Gas Refuel Service - Refuel Your Wallet with Native Tokens"
        description="Stay ahead in your blockchain transactions with Mintly's Gas Refuel service. Efficiently manage your gas reserves, ensuring uninterrupted cross-chain activities with LayerZero technology."
      />
      <Gas />
    </>
  );
};

export default GasRefuel;
