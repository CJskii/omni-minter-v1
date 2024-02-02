import type { NextPage } from "next";

import Minting from "../../components/Minter/Minting";
import HeadComponent from "../../common/components/elements/HeadComponent";

const Mint: NextPage = () => {
  return (
    <>
      <HeadComponent
        title="Mintly: Mint - Mint Your wNFTs and Bridge Them Across Multiple Chains"
        description="Mintly's Mint page: Where seamless wNFT creation meets Wormhole interoperability. Start minting and bridging your wNFTs across multiple chains effortlessly."
      />
      <Minting
        contractProvider={{ type: "wormhole", contract: "W_NFT" }}
        stepDescription="Mint wNFT"
      />
    </>
  );
};

export default Mint;
