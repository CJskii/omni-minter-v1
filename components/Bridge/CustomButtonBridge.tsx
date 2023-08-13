interface CustomButtonProps {
  isLoading: boolean;
  wrongNetwork: boolean;
  nftId: string;
  handleBridge: () => void;
}

const CustomButtonBridge = (props: CustomButtonProps) => {
  const { isLoading, wrongNetwork, nftId, handleBridge } = props;
  console.log(wrongNetwork);
  return (
    <button
      // TODO: Add conditional logic to disable button if wrong network
      onClick={isLoading ? () => {} : handleBridge}
      disabled={!wrongNetwork}
      type="button"
      className={`relative inline-flex items-center justify-center w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-100 hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none 
        ${
          !wrongNetwork || nftId == ""
            ? " cursor-not-allowed text-gray-600"
            : ""
        }`}
    >
      {isLoading ? (
        <span className="loading loading-infinity loading-md"></span>
      ) : (
        "Bridge"
      )}
    </button>
  );
};

export default CustomButtonBridge;
