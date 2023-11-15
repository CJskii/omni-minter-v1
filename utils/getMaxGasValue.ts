import { maxGasValues } from "../constants/maxGasValues";
import { transformNetworkName } from "./getConstants";

export const getMaxGasValue = (toNetwork: string) => {
  const networkName = transformNetworkName(toNetwork);
  try {
    const maxGas = maxGasValues[networkName].adapterParamMaxGas;
    return maxGas;
  } catch (error) {
    console.error(`Cannot read max gas value for ${networkName} `, error);
    return 0.05;
  }
};
