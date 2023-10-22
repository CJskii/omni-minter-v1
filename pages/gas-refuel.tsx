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
        title="Mintly Gas Refuel"
        description="Refuel your account with Mintly Gas utilising Layer Zero technology!"
      />
      <Gas />
    </>
  );
};

export default GasRefuel;
