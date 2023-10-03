import { useNetwork } from "wagmi";
import { handleGasRefuel } from "../../utils/helpers/handleGasRefuel";

const Gas = () => {
  const handleGas = async () => {
    const CONTRACT_ADDRESS = "0xaa1293660a7bA50569b7F24Cbf7C1fc50BEE340E";

    try {
      const result = await handleGasRefuel({
        CONTRACT_ADDRESS,
        targetNetwork: "Sepolia",
      });

      if (!result) {
        throw new Error("Failed to mint NFT");
      }

      const { txHash } = result;
    } catch (e) {
      console.error(e);
    }
  };

  const handleMint = async () => {};

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <h1>Gas</h1>
      <button onClick={handleGas} className="btn">
        Send gas
      </button>
    </div>
  );
};

export default Gas;
