import type { NextPage } from "next";

import Minting from "../../components/Minter/Minting";
import HeadComponent from "../../common/components/elements/HeadComponent";

const Mint: NextPage = () => {
  return (
    <>
      <HeadComponent
        title="Mintly: Mint - Mint Your ONFTs and Bridge Them Across Multiple Chains"
        description="Mintly's Mint page: Where seamless ONFT creation meets LayerZero's interoperability. Start minting and bridging your ONFTs across multiple chains effortlessly."
      />
      <Minting contractProvider="LayerZero" />
    </>
  );
};

export default Mint;
