const DisplayModalMessage = ({
  showRewardModal,
  response,
  setShowRewardModal,
  dialogRef,
}: {
  showRewardModal: boolean;
  response: any;
  setShowRewardModal: (show: boolean) => void;
  dialogRef: any;
}) => {
  if (!showRewardModal) return null;
  if (response.status === "success") {
    return (
      <div className="card card-compact w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body flex flex-col justify-center items-center">
          <p className="text-xl">{response.message}</p>
          <p className="text-content p-4 text-lg">
            {response.data.dailyReward.description}
          </p>
          <p className="text-success p-4 text-2xl">
            +{response.data.dailyReward.points} XP
          </p>
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              if (dialogRef.current) {
                dialogRef.current.close();
              }
              setShowRewardModal(false);
            }}
            className="relative inline-flex items-center justify-center w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-200 hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    );
  } else if (response.status == "error") {
    return (
      <div className="card card-compact w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body flex flex-col justify-center items-center">
          <h2 className="card-title p-2">Something went wrong</h2>
          <p className="text-error p-4 text-lg">{response.message}</p>
          <span className="block align-left p-4 text-md">Try again later!</span>
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              if (dialogRef.current) {
                dialogRef.current.close();
              }
              setShowRewardModal(false);
            }}
            className="relative inline-flex items-center justify-center min-w-full px-4 py-4 text-primary-focus text-xl font-semibold transition-all duration-200 border-[1px] border-base-200 hover:opacity-80 focus:opacity-80 focus:bg-gradient-to-l from-primary to-secondary hover:text-content focus:text-success-content focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
};

export default DisplayModalMessage;
