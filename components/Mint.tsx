import { useState } from "react";
import { ethers, providers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { GOERLI_ONFT_CONTRACT_ADDRESS, GOERLI_ABI } from "../constants/goerli";
import { parse } from "path";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const Mint = () => {
  const [selectedNetwork, setSelectedNetwork] = useState(""); // State for network selection

  const mintNft = async () => {
    if (selectedNetwork === "") {
      alert("Please select a network");
      return;
    } else {
      console.log(selectedNetwork);
      console.log("Minting NFT");

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new Contract(
        GOERLI_ONFT_CONTRACT_ADDRESS,
        GOERLI_ABI,
        signer
      );
      // Retrieve contract fee in wei
      const contractFeeInWei = await contract.fee();
      console.log(contractFeeInWei.toString());

      // Convert contract fee to ether and use it for transaction
      const feeInEther = ethers.utils.formatEther(contractFeeInWei);
      console.log(feeInEther);
      //const fee = ethers.utils.parseEther("0.0004"); // Set the fee in ether, you can adjust the value as needed
      // Use the fee for your function call
      let tx = await (
        await contract.mint({ value: ethers.utils.parseEther(feeInEther) })
      ).wait();
      console.log(tx);
      let onftTokenId = await provider.getTransactionReceipt(
        tx.transactionHash
      );
      console.log(`ONFT nftId: ${parseInt(onftTokenId.logs[0].topics[3], 16)}`);
      console.log(tx.transactionHash);
      // let tx = await (await contract.mint({ value: fee })).wait();
      // let onftTokenId = await provider.getTransactionReceipt(
      //   tx.transactionHash
      // );
      // console.log(`ONFT nftId: ${parseInt(onftTokenId.logs[0].topics[3], 16)}`);
      // console.log(tx.transactionHash);
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
