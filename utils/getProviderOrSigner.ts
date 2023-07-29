import { ethers } from "ethers";
const getProviderOrSigner = async (needSigner = false) => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return needSigner ? signer : provider;
};

export default getProviderOrSigner;
