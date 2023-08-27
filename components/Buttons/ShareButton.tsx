const ShareButton = (props: { handleTwitterShare: () => void }) => {
  const { handleTwitterShare } = props;
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleTwitterShare}
      className="btn bg-primary text-base-300 px-2 py-1 hover:bg-primary-focus border-2 border-base-300 rounded hover:bg-opacity-2"
    >
      Share
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        viewBox="0 0 512 512"
        width="20"
        className="ml-2 fill-base-200"
      >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    </button>
  );
};

export default ShareButton;
