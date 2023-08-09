const { useState } = require("react");
import { networks } from "../../constants/networkConfig";
import SelectWithLogo from "./SelectWithLogo";
import Image from "next/image";

interface NetworkSelectionProps {
  setFromNetwork: (network: string) => void;
  setToNetwork: (network: string) => void;
  fromNetwork: string;
  toNetwork: string;
}

const NetworkSelection = (props: NetworkSelectionProps) => {
  const { setFromNetwork, setToNetwork, toNetwork, fromNetwork } = props;
  return (
    <div className="flex items-center justify-evenly gap-16 px-4 py-8  w-full">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">From Network</span>
        </label>
        <select
          className="select w-full max-w-xs text-lg"
          value={props.fromNetwork}
          onChange={(e) => setFromNetwork(e.target.value)}
        >
          <option disabled selected value="">
            Select Network
          </option>
          {networks.map((network: any) => (
            <option key={network.name} value={network.name}>
              {network.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">To Network</span>
        </label>
        <select
          className="select w-full max-w-xs text-lg"
          value={toNetwork}
          onChange={(e) => setToNetwork(e.target.value)}
        >
          <option disabled selected value="">
            Select Network
          </option>
          {networks.map((network: any) => (
            <option key={network.name} value={network.name}>
              {network.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NetworkSelection;
