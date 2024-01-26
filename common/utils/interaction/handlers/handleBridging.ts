import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { Network } from "../../../types/network";
import handleInteraction from "./handleInteraction";

export const handleBridging = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  contractProvider,
  address,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  contractProvider: {
    type: string;
    contract: string;
  };
  address: string;
}) => {
  const txGasLimit = fromNetwork.name == "Arbitrum One" ? 4000000 : 2000000;
  const signer = await getProviderOrSigner(true);
  const ownerAddress = await (signer as JsonRpcSigner).getAddress();
  let tx;
  if (
    contractProvider.type == "layerzero" &&
    contractProvider.contract == "ONFT"
  ) {
    tx = await onftBridge({
      TOKEN_ID,
      fromNetwork,
      toNetwork,
      ownerAddress,
      signer: signer as JsonRpcSigner,
      txGasLimit,
    });

    if (tx.hash) {
      await handleInteraction({
        address,
        operation: "new_bridge",
        type: contractProvider.type,
      });
    }

    return tx;
  } else if (
    contractProvider.type == "layerzero" &&
    contractProvider.contract == "OFT"
  ) {
    tx = await oftBridge({
      TOKEN_ID,
      fromNetwork,
      toNetwork,
      ownerAddress,
      signer: signer as JsonRpcSigner,
      txGasLimit,
    });

    if (tx.hash) {
      await handleInteraction({
        address,
        operation: "new_bridge",
        type: contractProvider.type,
      });
    }

    return tx;
  } else if (contractProvider.type == "wormhole") {
    tx = await wormholeBridge({
      TOKEN_ID,
      fromNetwork,
      toNetwork,
      ownerAddress,
      signer: signer as JsonRpcSigner,
      txGasLimit,
    });

    if (tx.hash) {
      await handleInteraction({
        address,
        operation: "new_bridge",
        type: contractProvider.type,
      });
    }

    return tx;
  }
};

const oftBridge = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  ownerAddress,
  signer,
  txGasLimit,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  ownerAddress: string;
  signer: JsonRpcSigner;
  txGasLimit: number;
}) => {
  if (!fromNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${fromNetwork.name}`);

  const contract = new Contract(
    fromNetwork.deployedContracts.layerzero.OFT.address,
    fromNetwork.deployedContracts.layerzero.OFT.ABI,
    signer
  );

  try {
    const remoteChainId = toNetwork.lzParams?.remoteChainId;

    const adapterParams = ethers.utils.solidityPack(
      ["uint16", "uint256"],
      [1, 300000]
    );

    // conver TOKEN_ID from ether to wei
    const quantityInWei = ethers.utils.parseEther("1").toString();

    // TODO: Read fees from the contract
    let [nativeFee, transferFee, totalCost] = await contract.getSendGas(
      remoteChainId,
      ownerAddress,
      TOKEN_ID,
      false,
      adapterParams
    );

    const tx = await contract.sendFrom(
      ownerAddress, // 'from' address to send tokens
      remoteChainId, // remote LayerZero chainId
      ownerAddress, // 'to' address to send tokens
      quantityInWei, // quantity to send
      ownerAddress, // refund address (if too much message fee is sent, it gets refunded)
      ethers.constants.AddressZero, // address(0x0) if not paying in ZRO (LayerZero Token)
      "0x", // flexible bytes array to indicate messaging adapter services
      {
        value: totalCost,
        gasLimit: txGasLimit,
      }
    );

    await tx.wait();
    console.log("OFT sent!");

    return tx;
  } catch (e) {
    console.error(e);
    throw new Error((e as any).data?.message || (e as any)?.message);
  }
};

const onftBridge = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  ownerAddress,
  signer,
  txGasLimit,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  ownerAddress: string;
  signer: JsonRpcSigner;
  txGasLimit: number;
}) => {
  if (!fromNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${fromNetwork.name}`);

  const contract = new Contract(
    fromNetwork.deployedContracts.layerzero.ONFT.address,
    fromNetwork.deployedContracts.layerzero.ONFT.ABI,
    signer
  );

  try {
    const remoteChainId = toNetwork.lzParams?.remoteChainId;

    const adapterParams = ethers.utils.solidityPack(
      ["uint16", "uint256"],
      [1, 300000]
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
        gasLimit: txGasLimit,
      }
    );

    await tx.wait();
    console.log("NFT sent!");

    return tx;
  } catch (e) {
    console.error(e);
    throw new Error((e as any).data?.message || (e as any)?.message);
  }
};

const wormholeBridge = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  ownerAddress,
  signer,
  txGasLimit,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  ownerAddress: string;
  signer: JsonRpcSigner;
  txGasLimit: number;
}) => {
  if (!fromNetwork.deployedContracts || !toNetwork.deployedContracts)
    throw new Error(
      `No deployed contracts found for ${fromNetwork.name} or ${toNetwork.name}`
    );

  const contract = new Contract(
    fromNetwork.deployedContracts.wormhole.NFT.address,
    fromNetwork.deployedContracts.wormhole.NFT.ABI,
    signer
  );

  const targetAddress = toNetwork.deployedContracts.wormhole.NFT.address;
  const targetChainId = toNetwork.whParams?.remoteChainId;

  const GAS_LIMIT = 300000; // TODO: Implement dynamic gas limit
  const receiverValue = 0; // receiver value is 0 for NFTs

  try {
    const [estimatedFee, totalCost] = await contract.getBridgeGas(
      targetChainId,
      receiverValue,
      GAS_LIMIT
    );

    let tx = await contract.sendPayload(
      targetChainId,
      targetAddress,
      TOKEN_ID,
      receiverValue,
      GAS_LIMIT,
      targetChainId,
      ownerAddress,
      {
        value: totalCost,
        gasLimit: txGasLimit,
      }
    );
    await tx.wait();

    console.log("NFT sent!");

    return tx;
  } catch (e) {
    throw new Error((e as any).data?.message || (e as any)?.message);
  }
};
