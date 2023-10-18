import { getContractAddress } from "../getConstants";
import { handleErrors } from "./handleErrors";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import getProviderOrSigner from "../../utils/getProviderOrSigner";
import { getRemoteChainId } from "../../utils/getConstants";
import { estimateGasParams } from "../../types/gas-refuel";

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
    const CONTRACT_ADDRESS = getContractAddress(fromNetwork.name);
    let targetNetwork = toNetwork.name.toLowerCase();

    const estimatedFee = await estimateGasBridgeFee({
      CONTRACT_ADDRESS,
      targetNetwork,
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
  CONTRACT_ADDRESS,
  targetNetwork,
  value,
  recipientAddress = "",
}: {
  CONTRACT_ADDRESS: string;
  targetNetwork: string;
  value: string;
  recipientAddress?: string;
}) => {
  const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
  const ownerAddress = await signer.getAddress();
  const refundAddress = recipientAddress || ownerAddress;
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const remoteChainId = getRemoteChainId(targetNetwork);
  const gasInWei = ethers.utils.parseUnits(value, "ether");
  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint", "uint", "address"],
    [2, 200000, gasInWei.toString(), refundAddress]
  );

  try {
    const [_nativeFee, _zroFee] = await contract.estimateGasBridgeFee(
      remoteChainId,
      false,
      adapterParams
    );

    return _nativeFee; // or _zroFee depending on the use case
  } catch (error) {
    console.error(`Error estimating gas fee: ${(error as any).message}`);
    throw error; // Propagate the error to handle it in the UI layer
  }
};
