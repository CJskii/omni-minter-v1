import type { NextPage } from "next";
import Minting from "../../components/Minter/Minting";
import HeadComponent from "../../common/components/elements/HeadComponent";
import { Layout } from "@/components/dashboard/layout";

const Mint: NextPage = () => {
  return (
    <Layout>
      <div className=" py-20 ">
        <HeadComponent
          title="Mintly: Mint - Mint Your ONFTs and Bridge Them Across Multiple Chains"
          description="Mintly's Mint page: Where seamless ONFT creation meets LayerZero's interoperability. Start minting and bridging your ONFTs across multiple chains effortlessly."
        />
        <Minting
          contractProvider={{ type: "wormhole", contract: "NFT" }}
          stepDescription="Mint wNFT"
        />
      </div>
    </Layout>
  );
};

export default Mint;
