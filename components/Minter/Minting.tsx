import { useEffect, useState } from "react";
import Image from "next/image";
import SelectMintModal from "./SelectMintModal";
import CustomButtonMint from "../CustomButtonMint";
import CustomButtonNetwork from "../CustomButtonNetwork";
import CardImage from "./CardImage";

const Minting = () => {
  const [lastMintId, setLastMintId] = useState(0);
  const [mintNetwork, setMintNetwork] = useState("");
  // const [wrongNetwork, setWrongNetwork] = useState(false);

  return (
    <div className="flex flex-col justify-betweeen items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-base">
          <CardImage />
          {/* Mint Form */}
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
            <div className="md:w-full xl:max-w-lg 2xl:max-w-xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between ">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl text-content-focus">
                Step 1: Mint ONFT
              </h2>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-natural-content"
                  >
                    {" "}
                    Select Chain{" "}
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <SelectMintModal setMintNetwork={setMintNetwork} />
                  </div>
                </div>

                <div>
                  <CustomButtonNetwork
                    mintNetwork={mintNetwork}
                    // setWrongNetwork={setWrongNetwork}
                  />
                </div>
              </div>

              <div className="mt-3 space-y-3">
                <CustomButtonMint
                  setLastMintId={setLastMintId}
                  mintNetwork={mintNetwork}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Minting;
