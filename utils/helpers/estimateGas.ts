import { handleErrors } from "./handleErrors";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../utils/getProviderOrSigner";
import { estimateGasParams } from "../../types/gas-refuel";
import { Network } from "../../types/network";

export const estimateGasRequest = async ({
  fromNetwork,
  toNetwork,
  inputAmount,
  setIsLoading,
  setGasFee,
  setErrorMessage,
  setShowGasModal,
  recipientAddress,
}: estimateGasParams) => {
  setIsLoading(true);
  try {
    const estimatedFee = await estimateGasBridgeFee({
      fromNetwork,
      targetNetwork: toNetwork,
      value: inputAmount,
      recipientAddress,
    });

    setGasFee(estimatedFee);
    setIsLoading(false);
  } catch (e) {
    console.error(e);
    handleErrors({ e, setErrorMessage });
    setShowGasModal(true);
    setIsLoading(false);
  }
};

const estimateGasBridgeFee = async ({
  fromNetwork,
  targetNetwork,
  value,
  recipientAddress = "",
}: {
  fromNetwork: Network;
  targetNetwork: Network;
  value: string;
  recipientAddress?: string;
}) => {
  const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
  const ownerAddress = await signer.getAddress();
  const refundAddress = recipientAddress || ownerAddress;

  if (!fromNetwork.deployedContracts)
    throw new Error(`No deployed contracts found for ${fromNetwork.name}`);

  // const contract = new Contract(
  //   fromNetwork.deployedContracts.ONFT.address,
  //   fromNetwork.deployedContracts.ONFT.ABI,
  //   signer
  // );

  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_lzEndpoint",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "_srcChainId",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_srcAddress",
          type: "bytes",
        },
        {
          indexed: false,
          internalType: "uint64",
          name: "_nonce",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_payload",
          type: "bytes",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_reason",
          type: "bytes",
        },
      ],
      name: "MessageFailed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "_srcChainId",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_srcAddress",
          type: "bytes",
        },
        {
          indexed: false,
          internalType: "uint64",
          name: "_nonce",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "_payloadHash",
          type: "bytes32",
        },
      ],
      name: "RetryMessageSuccess",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "_dstChainId",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "_type",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_minDstGas",
          type: "uint256",
        },
      ],
      name: "SetMinDstGas",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "precrime",
          type: "address",
        },
      ],
      name: "SetPrecrime",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "_remoteChainId",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_path",
          type: "bytes",
        },
      ],
      name: "SetTrustedRemote",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "_remoteChainId",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "_remoteAddress",
          type: "bytes",
        },
      ],
      name: "SetTrustedRemoteAddress",
      type: "event",
    },
    {
      inputs: [],
      name: "DEFAULT_PAYLOAD_SIZE_LIMIT",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "FEE_PERCENTAGE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "NO_EXTRA_GAS",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PT_SEND",
      outputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_dstChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_toAddress",
          type: "bytes",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_adapterParams",
          type: "bytes",
        },
      ],
      name: "bridgeGas",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_dstChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_toAddress",
          type: "bytes",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_adapterParams",
          type: "bytes",
        },
      ],
      name: "estimateSendFee",
      outputs: [
        {
          internalType: "uint256",
          name: "nativeFee",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "zroFee",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "totalCost",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      name: "failedMessages",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "feesEnabled",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_srcChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_srcAddress",
          type: "bytes",
        },
      ],
      name: "forceResumeReceive",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_version",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "_chainId",
          type: "uint16",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_configType",
          type: "uint256",
        },
      ],
      name: "getConfig",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_remoteChainId",
          type: "uint16",
        },
      ],
      name: "getTrustedRemoteAddress",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_srcChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_srcAddress",
          type: "bytes",
        },
      ],
      name: "isTrustedRemote",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "lzEndpoint",
      outputs: [
        {
          internalType: "contract ILayerZeroEndpoint",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_srcChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_srcAddress",
          type: "bytes",
        },
        {
          internalType: "uint64",
          name: "_nonce",
          type: "uint64",
        },
        {
          internalType: "bytes",
          name: "_payload",
          type: "bytes",
        },
      ],
      name: "lzReceive",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      name: "minDstGasLookup",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_srcChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_srcAddress",
          type: "bytes",
        },
        {
          internalType: "uint64",
          name: "_nonce",
          type: "uint64",
        },
        {
          internalType: "bytes",
          name: "_payload",
          type: "bytes",
        },
      ],
      name: "nonblockingLzReceive",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      name: "payloadSizeLimitLookup",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "precrime",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_srcChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_srcAddress",
          type: "bytes",
        },
        {
          internalType: "uint64",
          name: "_nonce",
          type: "uint64",
        },
        {
          internalType: "bytes",
          name: "_payload",
          type: "bytes",
        },
      ],
      name: "retryMessage",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_version",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "_chainId",
          type: "uint16",
        },
        {
          internalType: "uint256",
          name: "_configType",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_config",
          type: "bytes",
        },
      ],
      name: "setConfig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_feePercentage",
          type: "uint256",
        },
      ],
      name: "setFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_dstChainId",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "_packetType",
          type: "uint16",
        },
        {
          internalType: "uint256",
          name: "_minGas",
          type: "uint256",
        },
      ],
      name: "setMinDstGas",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_dstChainId",
          type: "uint16",
        },
        {
          internalType: "uint256",
          name: "_size",
          type: "uint256",
        },
      ],
      name: "setPayloadSizeLimit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_precrime",
          type: "address",
        },
      ],
      name: "setPrecrime",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_version",
          type: "uint16",
        },
      ],
      name: "setReceiveVersion",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_version",
          type: "uint16",
        },
      ],
      name: "setSendVersion",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_remoteChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_path",
          type: "bytes",
        },
      ],
      name: "setTrustedRemote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_remoteChainId",
          type: "uint16",
        },
        {
          internalType: "bytes",
          name: "_remoteAddress",
          type: "bytes",
        },
      ],
      name: "setTrustedRemoteAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "toggleFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      name: "trustedRemoteLookup",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "useCustomAdapterParams",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contract = new Contract(
    "0xF7715A66866683c1946F269fEc2CFaFDA951b65A",
    abi,
    signer
  );
  const gasInWei = ethers.utils.parseUnits(value, "ether");
  let adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint", "uint", "address"],
    [2, 200000, gasInWei.toString(), refundAddress]
  );

  try {
    const [_nativeFee, _zroFee] = await contract.estimateSendFee(
      targetNetwork.lzParams?.remoteChainId,
      refundAddress,
      gasInWei.toString(),
      adapterParams
    );

    return _nativeFee; // or _zroFee depending on the use case
  } catch (error) {
    console.error(`Error estimating gas fee: ${(error as any).message}`);
    throw error; // Propagate the error to handle it in the UI layer
  }
};
