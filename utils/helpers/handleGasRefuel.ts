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
  console.log(`Gas in wei: ${gasInWei}`);

  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint", "uint", "address"],
    [2, 200000, "55555555555", ownerAddress]
  );
  console.log(`Sending transaction to ${CONTRACT_ADDRESS}`);
  // Estimate gas fee
  try {
    const [_nativeFee, _zroFee] = await contract.estimateGasBridgeFee(
      remoteChainId,
      false,
      adapterParams
    );

    console.log(
      `Estimated native fee: ${ethers.utils.formatEther(
        _nativeFee.toString()
      )} ETH`
    );
    console.log(
      `Estimated ZRO fee: ${ethers.utils.formatEther(_zroFee.toString())} ZRO`
    );
    const estimatedFee = _nativeFee; // or _zroFee

    return estimatedFee;
  } catch (error) {
    console.error(`Error estimating gas fee: ${(error as any).message}`);
  }
};

export const handleGasRefuel = async ({
  CONTRACT_ADDRESS,
  targetNetwork,
}: {
  CONTRACT_ADDRESS: string;
  targetNetwork: string;
}) => {
  const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
  const ownerAddress = await signer.getAddress();
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const remoteChainId = getRemoteChainId(targetNetwork);
  console.log(contract);

  const gasRefuelValueInWei = ethers.utils.parseUnits("0.000001", "ether");

  const gasInEther = ethers.utils.formatEther("55555555555");
  console.log(`Gas: ${gasInEther}`);
  const gasInWei = ethers.utils.parseUnits("0.029", "ether");
  console.log(`Gas in wei: ${gasInWei}`);

  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint", "uint", "address"],
    [2, 200000, gasInWei, ownerAddress]
  );
  console.log(`Sending transaction to ${CONTRACT_ADDRESS}`);
  // Estimate gas fee
  try {
    const [_nativeFee, _zroFee] = await contract.estimateGasBridgeFee(
      remoteChainId,
      false,
      adapterParams
    );

    console.log(
      `Estimated native fee: ${ethers.utils.formatEther(
        _nativeFee.toString()
      )} ETH`
    );
    console.log(
      `Estimated ZRO fee: ${ethers.utils.formatEther(_zroFee.toString())} ZRO`
    );
    const estimatedFee = _nativeFee; // or _zroFee

    console.log(estimatedFee);
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
      console.log(`Transaction hash: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
      return { txHash: tx.hash };
    } catch (error) {
      console.error(`Error in transaction: ${(error as any).message}`);
    }
  } catch (error) {
    console.error(`Error estimating gas fee: ${(error as any).message}`);
  }
};
