import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { Network } from "../../../types/network";

export const handleBridging = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
}) => {
  const signer = await getProviderOrSigner(true);
  const ownerAddress = await (signer as JsonRpcSigner).getAddress();

  if (!fromNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${fromNetwork.name}`);

  const contract = new Contract(
    fromNetwork.deployedContracts.ONFT.address,
    fromNetwork.deployedContracts.ONFT.ABI,
    signer
  );

  // REMOTE CHAIN ID IS THE CHAIN OF THE RECEIVING NETWORK
  // ex. if you are sending from Ethereum to Polygon, the remote chain id is the Polygon chain id
  const remoteChainId = toNetwork.lzParams?.remoteChainId;

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

  console.log(`fees: ${fees}`);

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
    {
      value: nativeFee.mul(5).div(4),
      gasLimit: fromNetwork.name == "Arbitrum One" ? 2000000 : 1500000,
    }
  );

  await tx.wait();
  console.log("NFT sent!");

  return { txHash: tx.hash };
};
