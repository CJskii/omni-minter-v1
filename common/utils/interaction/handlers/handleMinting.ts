import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import getProviderOrSigner from "../../getters/getProviderOrSigner";
import { Network } from "../../../types/network";
import { getTokenId } from "../../getters/getTokenId";

export const handleMinting = async ({
  mintNetwork,
  contractProvider,
}: {
  mintNetwork: Network;
  contractProvider: {
    type: string;
    contract: string;
  };
}) => {
  // TODO: Refactor this function with dynamic gas limit
  const mintGasLimit = mintNetwork.name == "Arbitrum One" ? 2000000 : 1000000;

  if (contractProvider.type == "layerzero") {
    return handleLayerZeroMinting({ mintNetwork, mintGasLimit });
  } else if (contractProvider.type == "wormhole") {
    return handleWormholeMinting({ mintNetwork, mintGasLimit });
  }
};

const handleLayerZeroMinting = async ({
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
      signer as any,
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

const handleWormholeMinting = async ({
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
      mintNetwork.deployedContracts.wormhole.NFT.address,
      mintNetwork.deployedContracts.wormhole.NFT.ABI,
      signer as any,
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
