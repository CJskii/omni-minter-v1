import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { handleErrors } from "./handleErrors";
import { GasTransferParams } from "../../../types/gas-refuel";
import { Network } from "../../../types/network";
import { getGas } from "../../getters/getConstants";

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
  type,
}: GasTransferParams) => {
  setIsLoading(true);
  setShowGasModal(true);
  try {
    let result;
    if (type === "layerzero") {
      result = await handleLayerZeroRefuelTx({
        fromNetwork,
        targetNetwork: toNetwork,
        value: inputAmount,
        estimatedFee: gasFee,
        recipientAddress,
      });
    } else if (type === "wormhole") {
      result = await handleWormholeRefuelTx({
        fromNetwork,
        targetNetwork: toNetwork,
        value: inputAmount,
        recipientAddress,
      });
    }

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

const handleLayerZeroRefuelTx = async ({
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
  const txGasLimit = getGas({
    network: fromNetwork.name,
    txType: "bridge",
  });
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
        gasLimit: txGasLimit,
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

const handleWormholeRefuelTx = async ({
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

  if (!fromNetwork.deployedContracts || !targetNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${fromNetwork.name}`);

  const contract = new Contract(
    fromNetwork.deployedContracts.wormhole.W_REFUEL.address,
    fromNetwork.deployedContracts.wormhole.W_REFUEL.ABI,
    signer
  );

  const targetChainId = targetNetwork.whParams?.remoteChainId;
  const targetAddress =
    targetNetwork.deployedContracts.wormhole.W_REFUEL.address;
  const amountInWei = 0;
  const receiverValue = ethers.utils.parseEther(value);
  const GAS_LIMIT = 300000;

  try {
    const [estimatedFee, totalCost] = await contract.getBridgeGas(
      targetChainId,
      receiverValue,
      GAS_LIMIT
    );

    const tx = await contract.sendPayload(
      targetChainId,
      targetAddress,
      amountInWei,
      receiverValue.toString(),
      GAS_LIMIT,
      targetChainId,
      refundAddress,
      {
        value: totalCost,
        gasLimit: 300000,
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
