import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { Network } from "../../../types/network";

export const handleBridging = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  type,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  type: string;
}) => {
  const signer = await getProviderOrSigner(true);
  const ownerAddress = await (signer as JsonRpcSigner).getAddress();
  let tx = null;

  if (type === "layerZero") {
    tx = await layerZeroBridge({
      TOKEN_ID,
      fromNetwork,
      toNetwork,
      ownerAddress,
      signer: signer as JsonRpcSigner,
    });
  } else if (type === "wormhole") {
    tx = await wormholeBridge({
      TOKEN_ID,
      fromNetwork,
      toNetwork,
      ownerAddress,
      signer: signer as JsonRpcSigner,
    });
  }

  return { txHash: tx && tx.txHash ? tx.txHash : null };
};

const layerZeroBridge = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  ownerAddress,
  signer,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  ownerAddress: string;
  signer: JsonRpcSigner;
}) => {
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

  const nativeFee = fees[0];

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

  return tx;
};

const wormholeBridge = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  ownerAddress,
  signer,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  ownerAddress: string;
  signer: JsonRpcSigner;
}) => {
  if (!fromNetwork.deployedContracts || !toNetwork.deployedContracts)
    throw new Error(
      `No deployed contracts found for ${fromNetwork.name} or ${toNetwork.name}`
    );

  const contract = new Contract(
    fromNetwork.deployedContracts.ONFT.address,
    fromNetwork.deployedContracts.ONFT.ABI,
    signer
  );

  // REMOTE CHAIN ID IS THE CHAIN OF THE RECEIVING NETWORK
  // TODO: Implement this
  const targetAddress = toNetwork.deployedContracts.ONFT.address; // replace this with the address of the receiving network's NFT contract
  const targetChainId = toNetwork.deployedContracts.ONFT.address; // replace this with the chain id of the receiving network

  const GAS_LIMIT = 200000; // Implement dynamic gas limit
  const receiverValue = 0; // receiver value is 0 for NFTs

  try {
    const estimatedFee = await contract.getGas(
      targetChainId,
      receiverValue,
      GAS_LIMIT
    );

    console.log(`Estimated fee: ${estimatedFee}`);
    let tx = await contract.sendPayload(
      targetChainId,
      targetAddress,
      TOKEN_ID,
      receiverValue,
      GAS_LIMIT,
      targetChainId,
      ownerAddress,
      {
        value: estimatedFee,
        gasLimit: 250000,
      }
    );
    await tx.wait();
    console.log(`Transaction hash: ${tx.transactionHash}`);

    return tx;
  } catch (e) {
    console.error(e);
  }
};
