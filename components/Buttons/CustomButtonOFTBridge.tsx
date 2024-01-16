const BridgeOFTButton = (props: {
  onClick: () => void;
  disabled: boolean;
  isBridging: boolean;
  fromNetwork: string;
  chain: any;
}) => {
  const { onClick, disabled, isBridging, fromNetwork, chain } = props;

  return (
    <button
      className="btn btn-primary mt-2"
      onClick={onClick}
      disabled={disabled}
    >
      {fromNetwork != chain ? (
        "Switch"
      ) : isBridging ? (
        <span className="loading loading-infinity"></span>
      ) : (
        "Send"
      )}
    </button>
  );
};

export default BridgeOFTButton;
