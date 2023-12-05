import { ethers } from "ethers";

const getProviderOrSigner = async (needSigner = false) => {
  if (!window.ethereum) {
    throw new Error("Ethereum provider is not available on window.ethereum");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return needSigner ? signer : provider;
};

export default getProviderOrSigner;
