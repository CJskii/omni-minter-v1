import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import getProviderOrSigner from "../../utils/getProviderOrSigner";
import { getRemoteChainId } from "../../utils/getConstants";
import { getContractAddress } from "../../utils/getConstants";
import { handleErrors } from "./handleErrors";
import { GasTransferParams } from "../../types/gas-refuel";

export const gasTransferRequest = async ({
  fromNetwork,
  toNetwork,
  inputAmount,
  setIsLoading,
  setGasFee,
  setErrorMessage,
  setShowGasModal,
  setTxHash,
  setTransactionBlockNumber,
  gasFee,
  recipientAddress,
}: GasTransferParams) => {
  setIsLoading(true);
  setShowGasModal(true);
  const CONTRACT_ADDRESS = getContractAddress(fromNetwork.name);
  let targetNetwork = toNetwork.name.toLowerCase();

  try {
    const result = await handleGasTransaction({
      CONTRACT_ADDRESS,
      targetNetwork,
      value: inputAmount,
      estimatedFee: gasFee,
      recipientAddress,
    });

    if (!result) {
      throw new Error("Failed to mint NFT");
    }
    const { txHash, blockNumber } = result;
    setTxHash(txHash);
    setTransactionBlockNumber(blockNumber);
    setGasFee("");
    setIsLoading(false);
  } catch (e) {
    console.error(e);
    handleErrors({ e, setErrorMessage });
    setIsLoading(false);
    setShowGasModal(true);
  }
};

const handleGasTransaction = async ({
  CONTRACT_ADDRESS,
  targetNetwork,
  value,
  estimatedFee,
  recipientAddress = "",
}: {
  CONTRACT_ADDRESS: string;
  targetNetwork: string;
  value: string;
  estimatedFee: string;
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

  const gasPrice = await signer.getGasPrice();
  try {
    const tx = await contract.bridgeGas(
      remoteChainId,
      refundAddress,
      adapterParams,
      {
        value: estimatedFee,
        // gasLimit: ethers.utils.parseUnits("250000", "wei"),
        gasPrice: gasPrice.mul(5).div(4),
      }
    );

    const receipt = await tx.wait();

    return {
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
    };
  } catch (error) {
    console.error(`Error in transaction: ${(error as any).message}`);
    throw error; // Propagate the error to handle it in the UI layer
  }
};
