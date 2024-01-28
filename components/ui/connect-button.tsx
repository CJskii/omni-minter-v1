"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./button";
import { ConnectWallet } from "@thirdweb-dev/react";

export const ConnectWalletButton = () => {
  return (
    <ConnectWallet
      // TODO: theme toggle
      theme={"dark"}
      auth={{ loginOptional: false }}
      switchToActiveChain={true}
      modalSize={"wide"}
      welcomeScreen={{}}
    />
  );
  // return (
  //   <ConnectButton.Custom>
  //     {({
  //       account,
  //       chain,
  //       openAccountModal,
  //       openChainModal,
  //       openConnectModal,
  //       authenticationStatus,
  //       mounted,
  //     }) => {
  //       const ready = mounted && authenticationStatus !== "loading";
  //       const connected =
  //         ready &&
  //         account &&
  //         chain &&
  //         (!authenticationStatus || authenticationStatus === "authenticated");
  //       return (
  //         <div
  //           {...(!ready && {
  //             "aria-hidden": true,
  //             style: {
  //               opacity: 0,
  //               pointerEvents: "none",
  //               userSelect: "none",
  //             },
  //           })}
  //         >
  //           {(() => {
  //             if (!connected) {
  //               return (
  //                 <Button
  //                   className="bg-gradient rounded-xl font-normal  text-white hover:opacity-90"
  //                   onClick={openConnectModal}
  //                   type="button"
  //                 >
  //                   Connect Wallet
  //                 </Button>
  //               );
  //             }
  //             if (chain.unsupported) {
  //               return (
  //                 <Button
  //                   variant={"destructive"}
  //                   onClick={openChainModal}
  //                   type="button"
  //                   className="rounded-xl"
  //                 >
  //                   Wrong network
  //                 </Button>
  //               );
  //             }
  //             return (
  //               <div style={{ display: "flex", gap: 12 }}>
  //                 <Button
  //                   className="rounded-xl"
  //                   variant={"outline"}
  //                   onClick={openChainModal}
  //                   style={{ display: "flex", alignItems: "center" }}
  //                   type="button"
  //                 >
  //                   {chain.hasIcon && (
  //                     <div
  //                       style={{
  //                         background: chain.iconBackground,
  //                         width: 12,
  //                         height: 12,
  //                         borderRadius: 999,
  //                         overflow: "hidden",
  //                         marginRight: 4,
  //                       }}
  //                     >
  //                       {chain.iconUrl && (
  //                         <img
  //                           alt={chain.name ?? "Chain icon"}
  //                           src={chain.iconUrl}
  //                           style={{ width: 12, height: 12 }}
  //                         />
  //                       )}
  //                     </div>
  //                   )}
  //                   {chain.name}
  //                 </Button>
  //                 <Button
  //                   variant={"outline"}
  //                   onClick={openAccountModal}
  //                   className="bg-gradient rounded-xl font-normal  text-white hover:opacity-90"
  //                   type="button"
  //                 >
  //                   {account.displayName}
  //                   {account.displayBalance
  //                     ? ` (${account.displayBalance})`
  //                     : ""}
  //                 </Button>
  //               </div>
  //             );
  //           })()}
  //         </div>
  //       );
  //     }}
  //   </ConnectButton.Custom>
  // );
};
