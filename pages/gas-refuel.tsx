import Gas from "../components/GasRefuel/Gas";
import HeadComponent from "../components/HeadComponent";

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
