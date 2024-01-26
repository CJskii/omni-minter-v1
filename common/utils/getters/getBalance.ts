import { Contract } from "ethers";
import getProviderOrSigner from "./getProviderOrSigner";

export const getBalance = async ({
  abi,
  walletAddress,
  contractAddress,
}: {
  abi: any;
  walletAddress: string;
  contractAddress: string;
}) => {
  try {
    const provider = await getProviderOrSigner();
    const contractInstance = new Contract(contractAddress, abi, provider);
    const balance = await contractInstance.balanceOf(walletAddress);
    return balance.toString();
  } catch (e) {
    console.error(e);
  }
};
