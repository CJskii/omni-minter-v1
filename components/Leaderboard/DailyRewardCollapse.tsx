import { FaAward } from "react-icons/fa";

const DailyRewardCollapse = () => {
  // Mock variable representing the current day the user is on
  // In a real-world scenario, this would be fetched from the Prisma DB
  const currentUserDay = 3; // Example: user is on day 3

  const rewards = [
    { day: 1, points: 30 },
    { day: 2, points: 60 },
    { day: 3, points: 120 },
    { day: 4, points: 150 },
    { day: 5, points: 300 },
    { day: 6, points: 400 },
    { day: 7, points: 500 },
    { day: 8, points: 500 },
  ];

  const currentReward = rewards.find((reward) => reward.day === currentUserDay);

  return (
    <div
      tabIndex={0}
      className="collapse collapse-plus border border-base-300 bg-base-200 w-full"
    >
      <div className="collapse-title text-xl font-medium">Daily rewards</div>

      <div className="collapse-content flex justify-center flex-col items-center">
        <p className="px-4 py-2 text-content-focus text-center">
          Engage with our platform daily and earn rewards. Each day offers a
          higher reward than the previous. Claim your reward each day and watch
          your points grow!
        </p>
        <div className="reward-card p-4 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 text-gray-600"></div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <FaAward className="w-[64px] h-[64px] text-yellow-500" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Day {currentReward?.day ? currentReward?.day : 1} Reward
              </h2>
              <p>+{currentReward?.points ? currentReward?.points : 30} XP</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    // Claim logic here
                    console.log("Claimed!");
                  }}
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRewardCollapse;
