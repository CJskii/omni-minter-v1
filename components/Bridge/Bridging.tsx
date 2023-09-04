import { useState, useEffect } from "react";
import { getContractAddress } from "../../utils/getConstants";
import { useNetwork, useAccount } from "wagmi";
import CustomButtonNetwork from "../Buttons/CustomButtonNetwork";
import CustomButtonBridge from "../Buttons/CustomButtonBridge";
import SelectBridgeFromModal from "./SelectBridgeFromModal";
import SelectBridgeToModal from "./SelectBridgeToModal";
import BridgingModal from "./BridgingModal";
import { handleBridging } from "../../utils/helpers/handleBridging";
import { handleErrors } from "../../utils/helpers/handleErrors";
import handleInteraction from "../../utils/helpers/handleInteraction";

interface BridgeProps {
  passedNftId: string;
  mintNetwork: string;
  onBridgeComplete: () => void;
}

const Bridging = (props: BridgeProps) => {
  let { passedNftId, mintNetwork, onBridgeComplete } = props;
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const [fromNetwork, setFromNetwork] = useState(mintNetwork || "Goerli");
  const [toNetwork, setToNetwork] = useState("");
  const [nftId, setNftId] = useState(passedNftId || "");
  const [showBridgingModal, setShowBridgingModal] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (passedNftId) setNftId(passedNftId);
    if (mintNetwork) setFromNetwork(mintNetwork);
    if (!mintNetwork || (chain?.name && !chain.unsupported)) {
      setFromNetwork(chain?.name || "Goerli");
    }
    checkNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedNftId, mintNetwork, chain?.name, chain?.unsupported]);

  useEffect(() => {
    checkNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromNetwork, toNetwork, chain?.name, chain?.unsupported]);

  const checkNetwork = () => {
    if (chain?.name == fromNetwork) {
      setWrongNetwork(false);
    } else {
      setWrongNetwork(true);
    }
  };

  const handleBridge = async () => {
    const TOKEN_ID = nftId;
    const CONTRACT_ADDRESS = getContractAddress(fromNetwork);
    let targetNetwork = toNetwork.toLowerCase();
    if (!nftId || nftId === "") {
      alert("Please enter a valid NFT Id");
      return;
    }

    try {
      setIsLoading(true);
      setShowBridgingModal(true);
      console.log(
        `Sending NFT #${TOKEN_ID} from ${fromNetwork} to ${toNetwork}`
      );

      const result = await handleBridging({
        TOKEN_ID,
        CONTRACT_ADDRESS,
        targetNetwork,
      });

      const { txHash } = result;

      if (address) {
        handleInteraction({
          address,
          operation: "new_bridge",
        });
      }

      setNftId("");
      setIsLoading(false);
      setTxHash(txHash);
      onBridgeComplete();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      handleErrors({ e, setErrorMessage });
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
              <BridgingModal
                showBridgingModal={showBridgingModal}
                isLoading={isLoading}
                setShowBridgingModal={setShowBridgingModal}
                txHash={txHash}
                setTxHash={setTxHash}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
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
              {chain?.name && !chain.unsupported ? (
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-natural-content"
                  >
                    Bridge To
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <SelectBridgeToModal
                      setToNetwork={setToNetwork}
                      fromNetwork={fromNetwork}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}

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
              <CustomButtonBridge
                isLoading={isLoading}
                wrongNetwork={wrongNetwork}
                nftId={nftId}
                handleBridge={handleBridge}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bridging;
