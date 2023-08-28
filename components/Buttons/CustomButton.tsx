import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import handleInteraction from "../../utils/helpers/handleInteraction";

export const CustomButton = () => {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (address) {
      const storedAddress = localStorage.getItem("createdUserAddress");
      if (storedAddress !== address) {
        handleInteraction({ address, operation: "new_user" });
      }
    }
  }, [isConnected, address]);

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
            className="play-btn px-4 py-3 animate-text text-2xl"
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
                return (
                  <span
                    onClick={openConnectModal}
                    className="text-lg play-btn px-[1.42rem] py-3 cursor-pointer font-normal animate-text bg-gradient-to-l from-primary to-secondary rounded text-secondary-content"
                  >
                    Connect Wallet
                  </span>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="text-lg play-btn px-[1rem] py-3 cursor-pointer font-normal animate-text bg-red-500 rounded"
                  >
                    Wrong Network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12, fontSize: "16px" }}>
                  <button
                    onClick={openChainModal}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 4,
                    }}
                    type="button"
                  >
                    {account.displayBalance}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {/* {account.displayName} */}

                    {/* ? ` (${account.displayBalance})`
                      : ""} */}
                    {account.address.slice(0, 6) +
                      "..." +
                      account.address.slice(account.address.length - 4)}
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
export default CustomButton;
