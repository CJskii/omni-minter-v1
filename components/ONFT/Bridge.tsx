import { useState } from "react";
import getProviderOrSigner from "../../utils/getProviderOrSigner";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import CHAIN_ID_JSON from "../../constants/chainId.json";
import CONTRACT_ADDRESS_JSON from "../../constants/contractAddress.json";
import { useAccount } from "wagmi";

interface BridgeProps {
  mintId: number;
  setMintId: (id: number) => void;
  fromNetwork: string;
  toNetwork: string;
}

interface ChainIdMap {
  [key: string]: number;
}

interface ContractAddressMap {
  [key: string]: string;
}

export const Bridge = (props: BridgeProps) => {
  const { address } = useAccount();
  const { fromNetwork, toNetwork } = props;

  const [isLoading, setIsLoading] = useState(false);

  const CHAIN_ID: ChainIdMap = CHAIN_ID_JSON as ChainIdMap;
  const CONTRACT_ADDRESS: ContractAddressMap =
    CONTRACT_ADDRESS_JSON as ContractAddressMap;

  const bridgeNft = async () => {
    const TOKEN_ID = props.mintId;
    let targetNetwork = toNetwork.toLowerCase();
    if (TOKEN_ID === 0) {
      alert("Please enter a valid NFT Id");
      return;
    }

    // Check if the networks are the same
    if (fromNetwork === toNetwork) {
      alert("Please select different networks");
      return;
    }

    if (toNetwork.toLowerCase() === "polygon mumbai") {
      console.log("changing network");
      targetNetwork = "mumbai";
    }

    try {
      setIsLoading(true);
      const signer = await getProviderOrSigner(true);
      const ownerAddress = await (signer as JsonRpcSigner).getAddress();
      const remoteChainId = CHAIN_ID[targetNetwork.toLowerCase()];

      console.log(
        `Sending NFT #${TOKEN_ID} from ${fromNetwork} to ${toNetwork}`
      );

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

      await tx.wait();
      console.log("NFT sent!");
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded bg-black p-4 w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="p-4 text-xl font-bold text-white w-full text-left">
          Step 2: Bridge
        </h1>

        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text">NFT ID</span>
          </label>
          {address && fromNetwork != "" && toNetwork != "" ? (
            <input
              placeholder="Type here"
              className="text-xl input input-bordered w-full max-w-xs text-center"
              type="number"
              value={props.mintId || ""}
              onChange={(e) => props.setMintId(parseInt(e.target.value))}
            />
          ) : (
            <input
              disabled
              placeholder="Type here"
              className="text-xl input input-bordered w-full max-w-xs text-center"
              type="number"
              value={props.mintId || ""}
              onChange={(e) => props.setMintId(parseInt(e.target.value))}
            />
          )}
        </div>

        {address && fromNetwork != "" && toNetwork != "" ? (
          <button
            onClick={bridgeNft}
            className="btn rounded-lg border-accent w-full hover:border-primary hover:border-2"
          >
            Bridge
          </button>
        ) : (
          <button
            className="btn rounded-lg border-accent w-full hover:border-primary hover:border-2"
            disabled
          >
            Bridge
          </button>
        )}
      </div>
    </div>
  );
};

export default Bridge;
