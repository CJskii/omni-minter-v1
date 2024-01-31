import HeadComponent from "../../common/components/elements/HeadComponent";
import TokenBridge from "../../components/Token/TokenBridge";

const OFT = () => {
  return (
    <>
      <HeadComponent
        title="Mintly: Bridge - Bridge Your wERC20 Tokens Across Multiple Chains"
        description="Mintly's Wormhole ERC20 Bridge: Where seamless ERC20 bridging meets Wormhole interoperability. Start bridging your wERC20 tokens across multiple chains effortlessly."
      />
      <TokenBridge
        contractProvider={{ type: "wormhole", contract: "W_ERC20" }}
      />
    </>
  );
};

export default OFT;
