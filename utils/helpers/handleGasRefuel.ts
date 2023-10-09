import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import getProviderOrSigner from "../../utils/getProviderOrSigner";
import { getRemoteChainId } from "../../utils/getConstants";

export const estimateGasBridgeFee = async ({
  CONTRACT_ADDRESS,
  targetNetwork,
  value,
}: {
  CONTRACT_ADDRESS: string;
  targetNetwork: string;
  value: string;
}) => {
  const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
  const ownerAddress = await signer.getAddress();
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const remoteChainId = getRemoteChainId(targetNetwork);
  const gasInWei = ethers.utils.parseUnits(value, "ether");

  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint", "uint", "address"],
    [2, 200000, gasInWei.toString(), ownerAddress]
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

export const handleGasRefuel = async ({
  CONTRACT_ADDRESS,
  targetNetwork,
  value,
  estimatedFee,
}: {
  CONTRACT_ADDRESS: string;
  targetNetwork: string;
  value: string;
  estimatedFee: string;
}) => {
  const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
  const ownerAddress = await signer.getAddress();
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const remoteChainId = getRemoteChainId(targetNetwork);
  const gasInWei = ethers.utils.parseUnits(value, "ether");

  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint", "uint", "address"],
    [2, 200000, gasInWei.toString(), ownerAddress]
  );

  const gasPrice = await signer.getGasPrice();

  try {
    const tx = await contract.bridgeGas(
      remoteChainId,
      ownerAddress,
      adapterParams,
      {
        value: estimatedFee,
        gasLimit: ethers.utils.parseUnits("250000", "wei"),
        gasPrice: gasPrice.mul(5).div(4),
      }
    );

    const receipt = await tx.wait();
    return { txHash: tx.hash, blockNumber: receipt.blockNumber };
  } catch (error) {
    console.error(`Error in transaction: ${(error as any).message}`);
    throw error; // Propagate the error to handle it in the UI layer
  }
};
