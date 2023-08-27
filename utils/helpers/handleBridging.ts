import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import { getRemoteChainId } from "../../utils/getConstants";
import getProviderOrSigner from "../../utils/getProviderOrSigner";

export const handleBridging = async ({
  CONTRACT_ADDRESS,
  TOKEN_ID,
  targetNetwork,
}: {
  CONTRACT_ADDRESS: string;
  TOKEN_ID: string;
  targetNetwork: string;
}) => {
  const signer = await getProviderOrSigner(true);
  const ownerAddress = await (signer as JsonRpcSigner).getAddress();
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  // REMOTE CHAIN ID IS THE CHAIN OF THE RECEIVING NETWORK
  // ex. if you are sending from Ethereum to Polygon, the remote chain id is the Polygon chain id
  const remoteChainId = getRemoteChainId(targetNetwork);

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
    { value: nativeFee.mul(5).div(4) }
  );

  await tx.wait();
  console.log("NFT sent!");

  return { txHash: tx.hash };
};
