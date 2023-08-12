import { useState } from "react";
import NetworkSelection from "../ONFT/NetworkSelection";
import styles from "./Home.module.css";
import Image from "next/image";
import SelectMintModal from "./SelectMintModal";

const Minting = () => {
  const [mintId, setMintId] = useState(0);
  const [fromNetwork, setFromNetwork] = useState(""); // State for "From" network selection
  const [toNetwork, setToNetwork] = useState(""); // State for "To" network selection
  return (
    <div className="flex flex-col justify-betweeen items-center min-w-full">
      {/* <h1 className="text-xl text-primary">Mint ONFT</h1>
      <div>
        <SelectMintModal />
        <button>Mint</button>
      </div> */}
      <div className="card card-side bg-base-100 shadow-xl md:w-5/6">
        <figure>
          <Image src="/1.png" alt="1" width={400} height={400} />
        </figure>
        <div className="card-body flex flex-col justify-between pt-0 ">
          <div>
            <h2 className="card-title pb-4 text-3xl">Step 1: Mint ONFT</h2>
            <SelectMintModal />
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Mint</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minting;
