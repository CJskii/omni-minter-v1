import MintStats from "./Mints";
import BridgeStats from "./Bridges";
import StreakStats from "./Streak";
import ReferralStats from "./Referral";

const UserStats = (props: any) => {
  const { filteredStats } = props;

  const mintCount = filteredStats[0].mints[0].count;
  const bridgeCount = filteredStats[0].bridges[0].count;
  const currentStreak = filteredStats[0].streaks[0].currentStreak;
  const totalPoints = filteredStats[0].totalPoints;

  return (
    <div>
      <div className="stats shadow w-full">
        <MintStats mintCount={mintCount} />
        <BridgeStats bridgeCount={bridgeCount} />
        <StreakStats currentStreak={currentStreak} />
        <ReferralStats />
      </div>

      <span className="block text-right p-2">
        Your total XP:{" "}
        <span className="font-bold">{totalPoints ? totalPoints : 0}</span>
      </span>
    </div>
  );
};

export default UserStats;
