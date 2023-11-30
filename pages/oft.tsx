import HeadComponent from "../components/HeadComponent";
import TokenBridge from "../components/Token/TokenBridge";

const OFT = () => {
  return (
    <>
      <HeadComponent
        title="Mintly: OFT Bridge - Bridge Your OFT Tokens Across Multiple Chains"
        description="Mintly's OFT Bridge: Where seamless OFT bridging meets LayerZero's interoperability. Start bridging your OFT tokens across multiple chains effortlessly."
      />
      <TokenBridge />;
    </>
  );
};

export default OFT;
