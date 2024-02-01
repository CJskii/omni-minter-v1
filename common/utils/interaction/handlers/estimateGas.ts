import { handleErrors } from "./handleErrors";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { estimateGasParams } from "../../../types/gas-refuel";
import { Network } from "../../../types/network";
import { getGas } from "../../getters/getConstants";

export const estimateGasRequest = async ({
  fromNetwork,
  toNetwork,
  inputAmount,
  setIsLoading,
  setGasFee,
  setErrorMessage,
  setShowGasModal,
  recipientAddress,
  type,
}: estimateGasParams) => {
  setIsLoading(true);
  try {
    if (type === "layerzero") {
      const estimatedFee = await estimateLayerZeroGasFee({
        fromNetwork,
        targetNetwork: toNetwork,
        value: inputAmount,
        recipientAddress,
      });
      setGasFee(estimatedFee);
    } else if (type === "wormhole") {
      const estimatedFee = await estimateWormholeGasFee({
        fromNetwork,
        targetNetwork: toNetwork,
        value: inputAmount,
      });
      setGasFee(estimatedFee);
    }

    setIsLoading(false);
  } catch (e) {
    console.error(e);
    handleErrors({ e, setErrorMessage });
    setShowGasModal(true);
    setIsLoading(false);
  }
};

const estimateLayerZeroGasFee = async ({
  fromNetwork,
  targetNetwork,
  value,
  recipientAddress = "",
}: {
  fromNetwork: Network;
  targetNetwork: Network;
  value: string;
  recipientAddress?: string;
}) => {
  const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
  const ownerAddress = await signer.getAddress();
  const refundAddress = recipientAddress || ownerAddress;
  const adapterParamsGas = getGas({
    network: targetNetwork.name,
    adapterParams: true,
  });

  if (!fromNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${fromNetwork.name}`);
  const contract = new Contract(
    fromNetwork.deployedContracts.layerzero.REFUEL.address,
    fromNetwork.deployedContracts.layerzero.REFUEL.ABI,
    signer
  );

  const gasInWei = ethers.utils.parseUnits(value, "ether");
  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint", "uint", "address"],
    [2, adapterParamsGas, gasInWei.toString(), refundAddress]
  );

  try {
    const [_nativeFee, _zroFee, totalCost] = await contract.estimateSendFee(
      targetNetwork.lzParams?.remoteChainId,
      refundAddress,
      gasInWei.toString(),
      adapterParams
    );

    return totalCost;
  } catch (error) {
    console.error(`Error estimating gas fee: ${(error as any).message}`);
    throw error; // Propagate the error to handle it in the UI layer
  }
};

const estimateWormholeGasFee = async ({
  fromNetwork,
  targetNetwork,
  value,
}: {
  fromNetwork: Network;
  targetNetwork: Network;
  value: string;
}) => {
  const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
  const ownerAddress = await signer.getAddress();

  if (!fromNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${fromNetwork.name}`);
  const contract = new Contract(
    fromNetwork.deployedContracts.wormhole.W_REFUEL.address,
    fromNetwork.deployedContracts.wormhole.W_REFUEL.ABI,
    signer
  );

  const gasInWei = ethers.utils.parseUnits(value, "ether");
  const GAS_LIMIT = 300000;

  try {
    const [estimatedFee, totalCost] = await contract.getBridgeGas(
      targetNetwork.whParams?.remoteChainId,
      gasInWei.toString(),
      GAS_LIMIT
    );

    return totalCost;
  } catch (error) {
    console.error(`Error estimating gas fee: ${(error as any).message}`);
    throw error; // Propagate the error to handle it in the UI layer
  }
};
