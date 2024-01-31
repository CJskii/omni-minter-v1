import HeadComponent from "../../common/components/elements/HeadComponent";
import TokenBridge from "../../components/Token/TokenBridge";

const OFT = () => {
  return (
    <>
      <HeadComponent
        title="Mintly: OFT Bridge - Bridge Your OFT Tokens Across Multiple Chains"
        description="Mintly's OFT Bridge: Where seamless OFT bridging meets LayerZero's interoperability. Start bridging your OFT tokens across multiple chains effortlessly."
      />
      {/* <TokenBridge
        contractProvider={{ type: "wormhole", contract: "W_ERC20" }}
      /> */}
      <div>{"Coming soon ;)"}</div>
    </>
  );
};

export default OFT;
