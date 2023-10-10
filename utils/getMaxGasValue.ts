import { maxGasValues } from "../constants/maxGasValues";
import { transformNetworkName } from "./getConstants";

export const getMaxGasValue = (toNetwork: string) => {
  const networkName = transformNetworkName(toNetwork);
  return maxGasValues[networkName].adapterParamMaxGas;
};
