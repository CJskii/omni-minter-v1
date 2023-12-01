import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { Network } from "../../../types/network";
import { getTokenId } from "../../getters/getTokenId";

export const handleMinting = async (mintNetwork: Network) => {
  // Initiate provider and signer
  const provider = await getProviderOrSigner();
  const signer = await getProviderOrSigner(true);

  if (!(provider instanceof ethers.providers.Web3Provider)) {
    console.error("Provider is not an instance of Web3Provider");
    return;
  }

  if (!mintNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${mintNetwork.name}`);

  // Initiate contract instance and get fee
  const contract = new Contract(
    mintNetwork.deployedContracts.ONFT.address,
    mintNetwork.deployedContracts.ONFT.ABI,
    signer
  );
  const contractFeeInWei = await contract.fee();
  const feeInEther = ethers.utils.formatEther(contractFeeInWei);
  console.log(`Fee: ${feeInEther}`);

  // Mint NFT
  const nextMintId = await contract.nextMintId();
  console.log(`Next mint ID: ${nextMintId.toString()}`);

  let tx = await (
    await contract.mint({
      value: ethers.utils.parseEther(feeInEther),
      gasLimit: 250000,
    })
  ).wait();

  const txHash: string = tx.transactionHash;
  let mintedID = await getTokenId({ txHash, mintNetwork, provider });

  return { mintedID, txHash };
};
