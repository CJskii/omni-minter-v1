import { useState } from "react";
import getProviderOrSigner from "../utils/getProviderOrSigner";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../constants/contractABI";
import CHAIN_ID_JSON from "../constants/chainId.json";
import CONTRACT_ADDRESS_JSON from "../constants/contractAddress.json";

interface BridgeProps {
  mintId: number;
  setMintId: (id: number) => void;
}

interface ChainIdMap {
  [key: string]: number;
}

interface ContractAddressMap {
  [key: string]: string;
}

export const Bridge = (props: BridgeProps) => {
  const [fromNetwork, setFromNetwork] = useState(""); // State for "From" network selection
  const [toNetwork, setToNetwork] = useState(""); // State for "To" network selection
  const CHAIN_ID: ChainIdMap = CHAIN_ID_JSON as ChainIdMap;
  const CONTRACT_ADDRESS: ContractAddressMap =
    CONTRACT_ADDRESS_JSON as ContractAddressMap;

  const bridgeNft = async () => {
    const TOKEN_ID = 5;
    // if (TOKEN_ID === 0) {
    //   alert("Please enter a valid NFT Id");
    //   return;
    // }

    // // Check if the networks are selected
    // if (fromNetwork === "") {
    //   alert("Please select a From Network");
    //   return;
    // }

    // if (toNetwork === "") {
    //   alert("Please select a To Network");
    //   return;
    // }

    // // Check if the networks are the same
    // if (fromNetwork === toNetwork) {
    //   alert("Please select different networks");
    //   return;
    // }

    const signer = await getProviderOrSigner(true);
    const ownerAddress = await (signer as JsonRpcSigner).getAddress();
    const remoteChainId = CHAIN_ID[toNetwork.toLowerCase()];

    console.log(`Sending NFT #${TOKEN_ID} from ${fromNetwork} to ${toNetwork}`);

    const contract = new Contract(
      CONTRACT_ADDRESS[fromNetwork.toLowerCase()],
      CONTRACT_ABI,
      signer
    );

    const adapterParams = ethers.utils.solidityPack(
      ["uint16", "uint256"],
      [1, 200000]
    );

    const fees = await contract.estimateSendFee(
      remoteChainId,
      ownerAddress,
      TOKEN_ID,
      false,
      adapterParams
    );

    const nativeFee = fees[0];
    console.log(`native fees (wei): ${nativeFee}`);

    const tx = await contract.sendFrom(
      ownerAddress, // 'from' address to send tokens
      remoteChainId, // remote LayerZero chainId
      ownerAddress, // 'to' address to send tokens
      TOKEN_ID, // tokenId to send
      ownerAddress, // refund address (if too much message fee is sent, it gets refunded)
      ethers.constants.AddressZero, // address(0x0) if not paying in ZRO (LayerZero Token)
      adapterParams, // flexible bytes array to indicate messaging adapter services
      { value: nativeFee.mul(5).div(4) }
    );

    tx.wait();

    console.log(tx.transactionHash);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded bg-black p-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="p-4 text-4xl font-bold text-white">Bridge your NFT</h1>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <input
            placeholder="NFT Id"
            className="text-xl"
            type="number"
            value={props.mintId || 0}
            readOnly
          />
          {/* Dropdown for "From" network */}
          <select
            value={fromNetwork}
            onChange={(e) => setFromNetwork(e.target.value)}
            className="text-xl"
          >
            <option value="">Select From Network</option>
            <option value="Goerli">Goerli</option>
            <option value="Mumbai">Mumbai</option>
          </select>
          {/* Dropdown for "To" network */}
          <select
            value={toNetwork}
            onChange={(e) => setToNetwork(e.target.value)}
            className="text-xl"
          >
            <option value="">Select To Network</option>
            <option value="Goerli">Goerli</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        <button
          onClick={bridgeNft}
          className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
        >
          Bridge
        </button>
      </div>
    </div>
  );
};

export default Bridge;
