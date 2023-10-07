import { useNetwork } from "wagmi";
import { useState } from "react";
import { handleGasRefuel } from "../../utils/helpers/handleGasRefuel";
import SelectGasFromModal from "./SelectGasFromModal";
import SelectGasToModal from "./SelectGasToModal";
import { IoSwapHorizontalSharp } from "react-icons/io5";

const Gas = () => {
  const [fromNetwork, setFromNetwork] = useState<string>("");
  const [toNetwork, setToNetowork] = useState<string>("");

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

  return (
    <div className="flex flex-col justify-between items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none bg">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
          <div className="md:w-full xl:max-w-lg 2xl:max-w-xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between lg:p-8">
            <h2 className="text-xl font-bold leading-tight sm:text-4xl text-content-focus text-center">
              Gas Refuel
            </h2>

            <div className="flex">
              <SelectGasFromModal setFromNetwork={setFromNetwork} />
              <div className="py-4 px-2">
                <IoSwapHorizontalSharp className="text-2xl" />
              </div>

              <SelectGasToModal
                setToNetwork={setToNetowork}
                fromNetwork={fromNetwork}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gas;