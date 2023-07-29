import { useState } from "react";
import { ethers, providers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import CONTRACT_ADDRESS_JSON from "../constants/contractAddress.json";
import { CONTRACT_ABI } from "../constants/contractABI";
import getProviderOrSigner from "../utils/getProviderOrSigner";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface MintProps {
  setMintId: (id: number) => void;
}

interface ContractAddressMap {
  [key: string]: string;
}

export const Mint = (props: MintProps) => {
  const [selectedNetwork, setSelectedNetwork] = useState(""); // State for network selection
  const CONTRACT_ADDRESS: ContractAddressMap =
    CONTRACT_ADDRESS_JSON as ContractAddressMap;
  const mintNft = async () => {
    if (selectedNetwork === "") {
      alert("Please select a network");
      return;
    } else {
      console.log(`Minting NFT on ${selectedNetwork} network...`);
      const provider = await getProviderOrSigner();
      const signer = await getProviderOrSigner(true);

      if (!(provider instanceof ethers.providers.Web3Provider)) {
        console.error("Provider is not an instance of Web3Provider");
        return;
      }
      const contract = new Contract(
        CONTRACT_ADDRESS[selectedNetwork.toLowerCase()],
        CONTRACT_ABI,
        signer
      );
      console.log(contract);

      const contractFeeInWei = await contract.fee();

      const feeInEther = ethers.utils.formatEther(contractFeeInWei);
      console.log(`Fee: ${feeInEther} ETH`);
      const nextMintId = await contract.nextMintId();
      console.log(`Next mint ID: ${nextMintId.toString()}`);
      let tx = await (
        await contract.mint({ value: ethers.utils.parseEther(feeInEther) })
      ).wait();

      let transactionReceipt = await provider.getTransactionReceipt(
        tx.transactionHash
      );
      const mintedID = parseInt(transactionReceipt.logs[0].topics[3], 16);
      props.setMintId(mintedID);

      console.log(`ONFT nftId: ${mintedID.toString()}`);
      console.log(tx.transactionHash);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded bg-black p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="p-4 text-4xl font-bold text-white">Mint Your NFT</h1>
        {/* Dropdown for network selection */}
        <select
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          className="text-xl"
        >
          <option value="">Select Network</option>
          <option value="Goerli">Goerli</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <button
          onClick={mintNft}
          className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
        >
          Mint
        </button>
      </div>
    </div>
  );
};

export default Mint;
