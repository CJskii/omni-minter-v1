import { ethers } from "ethers";
import { Contract } from "ethers";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { Network } from "../../../types/network";
import { getTokenId } from "../../getters/getTokenId";
import { getGas } from "../../getters/getConstants";

export const handleMinting = async ({
  mintNetwork,
  contractProvider,
  mintQuantity,
}: {
  mintNetwork: Network;
  contractProvider: {
    type: string;
    contract: string;
  };
  mintQuantity?: number;
}) => {
  const mintGasLimit = getGas({
    network: mintNetwork.name,
    txType: "mint",
  });

  if (
    contractProvider.type == "layerzero" &&
    contractProvider.contract == "ONFT"
  ) {
    return handleONFTMint({ mintNetwork, mintGasLimit });
  } else if (
    contractProvider.type == "layerzero" &&
    contractProvider.contract == "OFT"
  ) {
    return handleOFTMint({ mintNetwork, mintGasLimit, quantity: mintQuantity });
  } else if (
    contractProvider.type == "wormhole" &&
    contractProvider.contract == "W_NFT"
  ) {
    return handleWNFTMint({ mintNetwork, mintGasLimit });
  } else if (
    contractProvider.type == "wormhole" &&
    contractProvider.contract == "W_ERC20"
  ) {
    return handleWERC20Mint({
      mintNetwork,
      mintGasLimit,
      quantity: mintQuantity,
    });
  }
};

const handleOFTMint = async ({
  mintNetwork,
  mintGasLimit,
  quantity = 1,
}: {
  mintNetwork: Network;
  mintGasLimit: number;
  quantity?: number;
}) => {
  try {
    const provider = await getProviderOrSigner();
    const signer = (await getProviderOrSigner(
      true
    )) as ethers.providers.JsonRpcSigner;

    const address = await signer.getAddress();

    if (!(provider instanceof ethers.providers.Web3Provider)) {
      console.error("Provider is not an instance of Web3Provider");
      return;
    }

    if (!mintNetwork.deployedContracts)
      throw new Error(`No deployed contracts found for ${mintNetwork.name}`);

    const contract = new Contract(
      mintNetwork.deployedContracts.layerzero.OFT.address,
      mintNetwork.deployedContracts.layerzero.OFT.ABI,
      signer
    );
    const contractFeeInWei = await contract.fee();
    const totalFeeInWei = contractFeeInWei.mul(quantity);

    const tx = await (
      await contract.mint(address, quantity, {
        value: totalFeeInWei,
        gasLimit: mintGasLimit,
      })
    ).wait();

    const txHash = tx.transactionHash;

    return { mintedID: quantity, txHash };
  } catch (e) {
    console.log(e);
    throw new Error((e as any).data?.message || (e as any)?.message);
  }
};

const handleONFTMint = async ({
  mintNetwork,
  mintGasLimit,
}: {
  mintNetwork: Network;
  mintGasLimit: number;
}) => {
  try {
    // Initiate provider and signer
    const provider = await getProviderOrSigner();
    const signer = await getProviderOrSigner(true);

    if (!(provider instanceof ethers.providers.Web3Provider)) {
      console.error("Provider is not an instance of Web3Provider");
      return;
    }

    if (!mintNetwork.deployedContracts)
      throw new Error(`No deployed contracts found for ${mintNetwork.name}`);

    // Initiate contract instance and get fee
    const contract = new Contract(
      mintNetwork.deployedContracts.layerzero.ONFT.address,
      mintNetwork.deployedContracts.layerzero.ONFT.ABI,
      signer
    );
    const contractFeeInWei = await contract.fee();
    const feeInEther = ethers.utils.formatEther(contractFeeInWei);

    let tx = await (
      await contract.mint({
        value: ethers.utils.parseEther(feeInEther),
        gasLimit: mintGasLimit,
      })
    ).wait();

    const txHash: string = tx.transactionHash;
    let mintedID = await getTokenId({ txHash, mintNetwork, provider });

    return { mintedID, txHash };
  } catch (e) {
    console.log(e);
    throw new Error((e as any).data?.message || (e as any)?.message);
  }
};

const handleWNFTMint = async ({
  mintNetwork,
  mintGasLimit,
}: {
  mintNetwork: Network;
  mintGasLimit: number;
}) => {
  try {
    // Initiate provider and signer
    const provider = await getProviderOrSigner();
    const signer = await getProviderOrSigner(true);

    if (!(provider instanceof ethers.providers.Web3Provider)) {
      console.error("Provider is not an instance of Web3Provider");
      return;
    }

    if (!mintNetwork.deployedContracts)
      throw new Error(`No deployed contracts found for ${mintNetwork.name}`);

    // Initiate contract instance and get fee
    const contract = new Contract(
      mintNetwork.deployedContracts.wormhole.W_NFT.address,
      mintNetwork.deployedContracts.wormhole.W_NFT.ABI,
      signer
    );
    const contractFeeInWei = await contract.fee();
    const feeInEther = ethers.utils.formatEther(contractFeeInWei);

    let tx = await (
      await contract.mint({
        value: ethers.utils.parseEther(feeInEther),
        gasLimit: mintGasLimit,
      })
    ).wait();

    const txHash: string = tx.transactionHash;
    let mintedID = await getTokenId({ txHash, mintNetwork, provider });

    return { mintedID, txHash };
  } catch (e) {
    console.log(e);
    throw new Error((e as any).data?.message || (e as any)?.message);
  }
};

const handleWERC20Mint = async ({
  mintNetwork,
  mintGasLimit,
  quantity = 1,
}: {
  mintNetwork: Network;
  mintGasLimit: number;
  quantity?: number;
}) => {
  try {
    const provider = await getProviderOrSigner();
    const signer = (await getProviderOrSigner(
      true
    )) as ethers.providers.JsonRpcSigner;

    const address = await signer.getAddress();

    if (!(provider instanceof ethers.providers.Web3Provider)) {
      console.error("Provider is not an instance of Web3Provider");
      return;
    }

    if (!mintNetwork.deployedContracts)
      throw new Error(`No deployed contracts found for ${mintNetwork.name}`);

    const contract = new Contract(
      mintNetwork.deployedContracts.wormhole.W_ERC20.address,
      mintNetwork.deployedContracts.wormhole.W_ERC20.ABI,
      signer
    );
    const contractFeeInWei = await contract.fee();
    const totalFeeInWei = contractFeeInWei.mul(quantity);

    const tx = await (
      await contract.mint(address, quantity, {
        value: totalFeeInWei,
        gasLimit: mintGasLimit,
      })
    ).wait();

    const txHash = tx.transactionHash;

    return { mintedID: quantity, txHash };
  } catch (e) {
    console.log(e);
    throw new Error((e as any).data?.message || (e as any)?.message);
  }
};
