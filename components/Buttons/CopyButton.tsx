import { FaCopy } from "react-icons/fa";

const CopyButton = (props: {
  handleCopyClick: () => void;
  copied: boolean;
}) => {
  const { handleCopyClick, copied } = props;
  return (
    <button
      onClick={handleCopyClick}
      onMouseDown={(e) => e.preventDefault()}
      className="btn px-2 py-1 bg-primary hover:bg-primary-focus border-2 border-base-300 text-base-200 rounded hover:bg-opacity-2"
    >
      {copied ? "Copied!" : "Copy"}
      <FaCopy className="ml-2 w-[20px] h-[20px] fill-base-200" />
    </button>
  );
};

export default CopyButton;
