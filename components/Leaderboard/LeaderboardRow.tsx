interface LeaderboardRowProps {
  user: any;
  index: number;
}

interface LeaderboardData {
  ethereumAddress: string;
  totalPoints: number;
  mints: [
    {
      count: number;
    }
  ];
  bridges: [
    {
      count: number;
    }
  ];
  interactions: [
    {
      count: number;
    }
  ];
  streaks: [
    {
      currentStreak: number;
    }
  ];

  key: [any];
}
const LeaderboardRow = (props: LeaderboardRowProps) => {
  const { user, index } = props;
  return (
    <div
      tabIndex={0}
      className="collapse bg-base-100 text-content focus:bg-primary-focus focus:text-primary-content mt-2"
    >
      <div className="collapse-title flex items-center justify-between">
        {/* Place in the leaderboard */}
        <div className="flex gap-8">
          <span className="leaderboard-rank">#{index + 1}</span>

          {/* Wallet Address */}
          <span className="wallet-address truncate">
            {user.ethereumAddress}
          </span>
        </div>

        {/* Number of Points */}
        <span className="points">{user.totalPoints}</span>
      </div>

      <div className="collapse-content flex flex-row-reverse justify-between">
        <div className="flex flex-col justify-center items-end pr-8">
          <p>
            ✅ Mints:{" "}
            {user.mints && user.mints.length > 0 ? user.mints[0].count : 0}
          </p>
          <p>
            ✅ Bridges:{" "}
            {user.bridges && user.bridges.length > 0
              ? user.bridges[0].count
              : 0}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start">
          {" "}
          <p>
            🔥 Current Streak:{" "}
            {user.streaks && user.streaks.length > 0
              ? user.streaks[0].currentStreak
              : 0}
          </p>
          <p>
            🎉 Interactions:{" "}
            {user.interactions && user.interactions.length > 0
              ? user.interactions[0].count
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardRow;
