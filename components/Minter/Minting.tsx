import { useEffect, useState } from "react";
import { activeChains } from "../../constants/config/chainsConfig";
import { useNetwork } from "wagmi";
import { checkIfReferredUser } from "../../common/utils/validators/checkIfReferredUser";
import { useNetworkSelection } from "../../common/components/hooks/useNetworkSelection";
import dynamic from "next/dynamic";
import { ExtendedNetwork } from "../../common/types/network";
import CardImage from "./CardImage";

const NetworkModal = dynamic(
  () => import("../../common/components/elements/modals/NetworkModal"),
  {
    loading: () => <span className="loading loading-dots loading-lg"></span>,
    ssr: true,
  }
);

const CustomButtonMint = dynamic(() => import("../Buttons/CustomButtonMint"), {
  loading: () => <span className="loading loading-dots loading-lg"></span>,
  ssr: true,
});

const CustomButtonNetwork = dynamic(
  () => import("../Buttons/CustomButtonNetwork"),
  {
    loading: () => <span className="loading loading-dots loading-lg"></span>,
    ssr: true,
  }
);

const Minting = ({
  contractProvider,
  stepDescription,
}: {
  contractProvider: {
    type: string;
    contract: any;
  };
  stepDescription: string;
}) => {
  const [lastMintId, setLastMintId] = useState(0);
  const [isInvited, setIsInvited] = useState(false);
  const [referredBy, setReferredBy] = useState("");
  const { chain } = useNetwork();

  const {
    selectedNetwork: mintNetwork,
    onNetworkSelect: setMintNetwork,
    searchTerm: fromSearchTerm,
    onSearchChange: setFromSearchTerm,
    filteredChains: fromFilteredChains,
    onClose: onFromClose,
  } = useNetworkSelection(contractProvider);

  useEffect(() => {
    let selected = mintNetwork;

    if (chain?.name && !chain.unsupported) {
      const networkObject = fromFilteredChains.find(
        (net) => net.name === chain.name
      );
      selected =
        (networkObject as ExtendedNetwork) ||
        (fromFilteredChains[0] as ExtendedNetwork);
    }
    const isReferredUser = checkIfReferredUser();
    const { isReferred, refLink } = isReferredUser;
    setIsInvited(isReferred);
    setReferredBy(refLink ? refLink : "");
    setMintNetwork(selected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.name]);

  return (
    <div className="flex flex-col justify-betweeen items-center min-w-full">
      <section className="bg-base card card-side bg-base-200 shadow-xl rounded-none bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-base">
          <CardImage />
          {/* Mint Form */}
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:p-8">
            <div className="md:w-full xl:max-w-lg 2xl:max-w-xl xl:mx-auto 2xl:pl-8 h-full flex flex-col justify-between ">
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl text-content-focus">
                Step 1: {stepDescription}
              </h2>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-natural-content"
                  >
                    {" "}
                    Select Chain{" "}
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <NetworkModal
                      selectedNetwork={mintNetwork}
                      onNetworkSelect={setMintNetwork}
                      searchTerm={fromSearchTerm}
                      onSearchChange={setFromSearchTerm}
                      filteredChains={fromFilteredChains}
                      onClose={onFromClose}
                      dialogId="mintNetworkModal"
                      title="Mint"
                    />
                  </div>
                </div>

                <div>
                  <CustomButtonNetwork mintNetwork={mintNetwork} />
                </div>
              </div>

              <div className="mt-3 space-y-3">
                <CustomButtonMint
                  setLastMintId={setLastMintId}
                  mintNetwork={mintNetwork}
                  isInvited={isInvited}
                  referredBy={referredBy}
                  contractProvider={contractProvider}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Minting;
