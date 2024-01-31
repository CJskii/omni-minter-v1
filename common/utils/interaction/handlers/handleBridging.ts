import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { Network } from "../../../types/network";
import handleInteraction from "./handleInteraction";
import { getGas } from "../../getters/getConstants";

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
  const txGasLimit = getGas({
    network: fromNetwork.name,
    txType: "bridge",
  });
  const adapterParamsGas = getGas({
    network: toNetwork.name,
    adapterParams: true,
  });

  const signer = await getProviderOrSigner(true);
  const ownerAddress = await (signer as JsonRpcSigner).getAddress();
  let tx;
  if (
    contractProvider.type == "layerzero" &&
    contractProvider.contract == "ONFT"
  ) {
    tx = await handleONFTBridge({
      TOKEN_ID,
      fromNetwork,
      toNetwork,
      ownerAddress,
      signer: signer as JsonRpcSigner,
      txGasLimit,
      adapterParamsGas,
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
    tx = await handleOFTBridge({
      TOKEN_ID,
      fromNetwork,
      toNetwork,
      ownerAddress,
      signer: signer as JsonRpcSigner,
      txGasLimit,
      adapterParamsGas,
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
    contractProvider.type == "wormhole" &&
    contractProvider.contract == "W_NFT"
  ) {
    tx = await handleWNFTBridge({
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
    contractProvider.type == "wormhole" &&
    contractProvider.contract == "W_ERC20"
  ) {
    tx = await handleWERC20Bridge({
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

const handleOFTBridge = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  ownerAddress,
  signer,
  txGasLimit,
  adapterParamsGas,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  ownerAddress: string;
  signer: JsonRpcSigner;
  txGasLimit: number;
  adapterParamsGas: number;
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
      [1, adapterParamsGas]
    );

    // conver TOKEN_ID from ether to wei
    const quantityInWei = ethers.utils.parseEther(TOKEN_ID).toString();

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

const handleONFTBridge = async ({
  TOKEN_ID,
  fromNetwork,
  toNetwork,
  ownerAddress,
  signer,
  txGasLimit,
  adapterParamsGas,
}: {
  TOKEN_ID: string;
  fromNetwork: Network;
  toNetwork: Network;
  ownerAddress: string;
  signer: JsonRpcSigner;
  txGasLimit: number;
  adapterParamsGas: number;
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
      [1, adapterParamsGas]
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

const handleWNFTBridge = async ({
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
    fromNetwork.deployedContracts.wormhole.W_NFT.address,
    fromNetwork.deployedContracts.wormhole.W_NFT.ABI,
    signer
  );

  const targetAddress = toNetwork.deployedContracts.wormhole.W_NFT.address;
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

const handleWERC20Bridge = async ({
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
    fromNetwork.deployedContracts.wormhole.W_ERC20.address,
    fromNetwork.deployedContracts.wormhole.W_ERC20.ABI,
    signer
  );

  const targetAddress = toNetwork.deployedContracts.wormhole.W_ERC20.address;
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
