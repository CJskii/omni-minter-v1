import { useState } from "react";

export const Bridge = () => {
  const [fromNetwork, setFromNetwork] = useState(""); // State for "From" network selection
  const [toNetwork, setToNetwork] = useState(""); // State for "To" network selection

  return (
    <div className="flex flex-col items-center justify-center rounded bg-black p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="p-4 text-4xl font-bold text-white">Bridge your NFT</h1>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <input placeholder="NFT Id" className="text-xl" type="number" />
          {/* Dropdown for "From" network */}
          <select
            value={fromNetwork}
            onChange={(e) => setFromNetwork(e.target.value)}
            className="text-xl"
          >
            <option value="">Select From Network</option>
            <option value="Goerli">Goerli</option>
            <option value="Mumbai">Mumbai</option>
          </select>
          {/* Dropdown for "To" network */}
          <select
            value={toNetwork}
            onChange={(e) => setToNetwork(e.target.value)}
            className="text-xl"
          >
            <option value="">Select To Network</option>
            <option value="Goerli">Goerli</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
          Bridge
        </button>
      </div>
    </div>
  );
};

export default Bridge;
