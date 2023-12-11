import { handleErrors } from "./handleErrors";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { estimateGasParams } from "../../../types/gas-refuel";
import { Network } from "../../../types/network";

export const estimateGasRequest = async ({
  fromNetwork,
  toNetwork,
  inputAmount,
  setIsLoading,
  setGasFee,
  setErrorMessage,
  setShowGasModal,
  recipientAddress,
}: estimateGasParams) => {
  setIsLoading(true);
  try {
    const estimatedFee = await estimateGasBridgeFee({
      fromNetwork,
      targetNetwork: toNetwork,
      value: inputAmount,
      recipientAddress,
    });

    setGasFee(estimatedFee);
    setIsLoading(false);
  } catch (e) {
    console.error(e);
    handleErrors({ e, setErrorMessage });
    setShowGasModal(true);
    setIsLoading(false);
  }
};

const estimateGasBridgeFee = async ({
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
    [2, 200000, gasInWei.toString(), refundAddress]
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
