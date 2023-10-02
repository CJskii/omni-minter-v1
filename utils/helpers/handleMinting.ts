import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import getProviderOrSigner from "../getProviderOrSigner";

export const handleMinting = async ({
  CONTRACT_ADDRESS,
  currentlyConnectedChain,
}: {
  CONTRACT_ADDRESS: string;
  currentlyConnectedChain: string;
}) => {
  // Initiate provider and signer
  const provider = await getProviderOrSigner();
  const signer = await getProviderOrSigner(true);

  if (!(provider instanceof ethers.providers.Web3Provider)) {
    console.error("Provider is not an instance of Web3Provider");
    return;
  }

  // Initiate contract instance and get fee
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const contractFeeInWei = await contract.fee();
  const feeInEther = ethers.utils.formatEther(contractFeeInWei);
  console.log(`Fee: ${feeInEther}`);

  // Mint NFT
  const nextMintId = await contract.nextMintId();
  console.log(`Next mint ID: ${nextMintId.toString()}`);

  let tx = await (
    await contract.mint({
      value: ethers.utils.parseEther(feeInEther),
      gasLimit:
        currentlyConnectedChain.toLowerCase() == "mantle" ? 100000 : null,
    })
  ).wait();

  let transactionReceipt = await provider.getTransactionReceipt(
    tx.transactionHash
  );

  const txHash: string = tx.transactionHash;
  let mintedID: number;

  if (currentlyConnectedChain.toLowerCase() === "zksync era") {
    mintedID = parseInt(transactionReceipt.logs[3].topics[3], 16);
  } else if (
    currentlyConnectedChain.toLowerCase() != "polygon" &&
    currentlyConnectedChain.toLowerCase() != "polygon mumbai"
  ) {
    mintedID = parseInt(transactionReceipt.logs[0].topics[3], 16);
  } else {
    mintedID = parseInt(transactionReceipt.logs[1].topics[3], 16);
  }

  return { mintedID, txHash };
};
