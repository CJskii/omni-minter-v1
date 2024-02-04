import {
  maxGasValuesLayerzero,
  maxGasValuesWormhole,
} from "../../../constants/contracts/maxGasValues";
import { transformNetworkName } from "./getConstants";

export const getMaxGasValue = ({
  toNetwork,
  type,
}: {
  toNetwork: string;
  type: string;
}) => {
  const networkName = transformNetworkName(toNetwork);
  try {
    if (type === "layerzero") {
      return maxGasValuesLayerzero[networkName].adapterParamMaxGas;
    }
    if (type === "wormhole") {
      return maxGasValuesWormhole[networkName].refuel;
    }
  } catch (error) {
    console.error(`Cannot read max gas value for ${networkName} `, error);
    return 0.05;
  }
};
