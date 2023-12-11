import { LeaderboardRowProps } from "../../../common/types/leaderboard";
const LeaderboardRow = (props: LeaderboardRowProps) => {
  const { user, index } = props;

  const calculateUserLevel = (totalXP: number): number => {
    let level = 0;
    let xpForNextLevel = 0;

    while (totalXP >= xpForNextLevel) {
      level++;
      xpForNextLevel = Math.pow(level, 2) * 10; // XP required for next level (quadratic formula)
    }

    return level - 1;
  };

  // Function to truncate Ethereum address
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

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
          <span className="wallet-address truncate hidden md:inline">
            {user.ethereumAddress}
          </span>
          <span className="wallet-address truncate md:hidden">
            {truncateAddress(user.ethereumAddress)}
          </span>
        </div>

        {/* Number of Points */}
        <span className="points">{calculateUserLevel(user.totalPoints)}</span>
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
            🎉 Total XP:{" "}
            {user.totalPoints && user.totalPoints > 0 ? user.totalPoints : 0}
          </p>
          <p>
            🔥 Streak:{" "}
            {user.streaks && user.streaks.length > 0
              ? user.streaks[0].currentStreak
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardRow;
