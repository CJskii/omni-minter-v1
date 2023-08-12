import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

interface SwitchNetworkProps {
  mintNetwork: string;
  //   setWrongNetwork: (wrongNetwork: boolean) => void;
}

export const CustomButtonNetwork = (props: SwitchNetworkProps) => {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [changeChain, setChangeChain] = useState(false);
  const { chain } = useNetwork();

  const { mintNetwork } = props;

  useEffect(() => {
    setSelectedNetwork(mintNetwork);
  }, [mintNetwork]);

  useEffect(() => {
    if (mintNetwork.toLowerCase() !== chain?.name.toLowerCase()) {
      setChangeChain(true);
      //   setWrongNetwork(true);
    } else {
      setChangeChain(false);
      //   setWrongNetwork(false);
    }
  }, [chain, mintNetwork]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            className=" "
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return null;
              }

              if (chain.unsupported) {
                return null;
              }
              return (
                <div className="space-y-2 text-gray-400 focus-within:text-gray-600">
                  <button
                    className="btn-square w-full"
                    onClick={openChainModal}
                  >
                    <div className="w-full">
                      <a className="flex gap-[15px] py-2 justify-start px-4 items-center border-base-100 border-[1px]">
                        {chain.hasIcon && chain.iconUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={30}
                            height={30}
                          />
                        )}
                        <div className="flex flex-col justify-start items-start text-lg">
                          {changeChain ? (
                            <>
                              <span className="text-error"> SWITCH</span>
                              <span className="font-bold text-error">
                                {chain.name}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-neutral">Connected to</span>
                              <span className="font-bold">{chain.name}</span>
                            </>
                          )}
                        </div>
                      </a>
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default CustomButtonNetwork;
