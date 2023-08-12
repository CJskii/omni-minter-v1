import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ABI } from "../../constants/contractABI";
import { getContractAddress } from "../../utils/getConstants";
import { getRemoteChainId } from "../../utils/getConstants";
import { useNetwork } from "wagmi";
import CustomButtonNetwork from "../CustomButtonNetwork";
import SelectBridgeFromModal from "./SelectBridgeFromModal";
import SelectBridgeToModal from "./SelectBridgeToModal";
import getProviderOrSigner from "../../utils/getProviderOrSigner";

interface BridgeProps {
  passedNftId: string;
  mintNetwork: string;
  onBridgeComplete: () => void;
}

const Bridging = (props: BridgeProps) => {
  let { passedNftId, mintNetwork, onBridgeComplete } = props;
  const { chain } = useNetwork();
  const [isLoading, setIsLoading] = useState(false);

  const [fromNetwork, setFromNetwork] = useState(mintNetwork || "Goerli");
  const [toNetwork, setToNetwork] = useState(""); // Assuming you'll have a default value for this as well.
  const [nftId, setNftId] = useState(passedNftId || ""); // Example: replace "DefaultNFTId" with your default value.

  const wrongNetwork = chain?.name == fromNetwork;

  useEffect(() => {
    if (passedNftId) setNftId(passedNftId);
    if (mintNetwork) setFromNetwork(mintNetwork);
    if (!mintNetwork || (chain?.name && !chain.unsupported)) {
      setFromNetwork(chain?.name || "Goerli");
    }
  }, [passedNftId, mintNetwork, chain?.name, chain?.unsupported]);

  const handleBridge = async () => {
    const TOKEN_ID = nftId;
    const CONTRACT_ADDRESS = getContractAddress(fromNetwork);
    let targetNetwork = toNetwork.toLowerCase();
    console.log(toNetwork);
    if (!nftId || nftId === "") {
      alert("Please enter a valid NFT Id");
      return;
    }

    try {
      setIsLoading(true);
      const signer = await getProviderOrSigner(true);
      const ownerAddress = await (signer as JsonRpcSigner).getAddress();

      // REMOTE CHAIN ID IS THE CHAIN OF THE RECEIVING NETWORK
      // ex. if you are sending from Ethereum to Polygon, the remote chain id is the Polygon chain id

      const remoteChainId = getRemoteChainId(targetNetwork);

      console.log(
        `Sending NFT #${TOKEN_ID} from ${fromNetwork} to ${toNetwork}`
      );

      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

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
      setNftId("");
      setIsLoading(false);
      onBridgeComplete();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none bg">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
          <div className="md:w-full xl:max-w-lg 2xl:max-w-xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between lg:p-8">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl text-content-focus">
              Step 2: Bridge ONFT
            </h2>

            <div className="space-y-5">
              {/* Select From Network */}
              <div className="my-8">
                <CustomButtonNetwork mintNetwork={fromNetwork} />
              </div>

              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-natural-content"
                >
                  Bridge From
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <SelectBridgeFromModal
                    setFromNetwork={setFromNetwork}
                    mintNetwork={mintNetwork}
                  />
                </div>
              </div>

              {/* Select To Network */}
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-natural-content"
                >
                  Bridge To
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  {/* <SelectBridgeModal /> */}
                  <SelectBridgeToModal
                    setToNetwork={setToNetwork}
                    fromNetwork={fromNetwork}
                  />
                </div>
              </div>

              {/* Input NFT ID */}
              <div className="mt-2.5">
                <label
                  htmlFor="nftId"
                  className="text-base font-medium text-natural-content"
                >
                  NFT ID
                </label>
                <input
                  type="number"
                  id="nftId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={passedNftId !== "" ? passedNftId : nftId || ""}
                  onChange={(e) => setNftId(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-3 space-y-3">
              <button
                onClick={isLoading ? () => {} : handleBridge}
                disabled={!wrongNetwork}
                type="button"
                className={`relative inline-flex items-center justify-center w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-100 hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none 
        ${
          !wrongNetwork || nftId == ""
            ? " cursor-not-allowed text-gray-600"
            : ""
        }`}
              >
                {isLoading ? (
                  <span className="loading loading-infinity loading-md"></span>
                ) : (
                  "Bridge"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bridging;
