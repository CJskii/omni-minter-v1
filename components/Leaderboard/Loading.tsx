const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center pt-4">
      <span className="loading loading-ring loading-xs"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-md"></span>
      <span className="loading loading-ring loading-sm"></span>
      <span className="loading loading-ring loading-xs"></span>
    </div>
  );
};

export default LoadingSpinner;
