import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { handleErrors } from "./handleErrors";
import { GasTransferParams } from "../../../types/gas-refuel";
import { Network } from "../../../types/network";

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
  try {
    const result = await handleGasTransaction({
      fromNetwork,
      targetNetwork: toNetwork,
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
  fromNetwork,
  targetNetwork,
  value,
  estimatedFee,
  recipientAddress = "",
}: {
  fromNetwork: Network;
  targetNetwork: Network;
  value: string;
  estimatedFee: string;
  recipientAddress?: string;
}) => {
  const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
  const ownerAddress = await signer.getAddress();
  const refundAddress = recipientAddress || ownerAddress;

  if (!fromNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${fromNetwork.name}`);

  const contract = new Contract(
    fromNetwork.deployedContracts.REFUEL.address,
    fromNetwork.deployedContracts.REFUEL.ABI,
    signer
  );

  const gasInWei = ethers.utils.parseUnits(value, "ether");

  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint", "uint", "address"],
    [2, 200000, gasInWei.toString(), refundAddress]
  );

  const gasPrice = await signer.getGasPrice();
  try {
    const [_nativeFee, _zroFee, totalCost] = await contract.estimateSendFee(
      targetNetwork.lzParams?.remoteChainId,
      refundAddress,
      gasInWei,
      adapterParams
    );

    const tx = await contract.bridgeGas(
      targetNetwork.lzParams?.remoteChainId,
      refundAddress,
      gasInWei,
      adapterParams,
      {
        value: totalCost,
        // gasLimit: ethers.utils.parseUnits("250000", "wei"),
        gasPrice: gasPrice.mul(5).div(4),
        gasLimit: 1500000,
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
