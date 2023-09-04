import MintStats from "./Mints";
import BridgeStats from "./Bridges";
import StreakStats from "./Streak";
import ReferralStats from "./Referral";

const UserStats = (props: any) => {
  const { filteredStats } = props;

  const mintCount = filteredStats[0].mints.length
    ? filteredStats[0].mints[0].count
    : 0;
  const bridgeCount = filteredStats[0].bridges.length
    ? filteredStats[0].bridges[0].count
    : 0;
  const currentStreak = filteredStats[0].streaks.length
    ? filteredStats[0].streaks[0].currentStreak
    : 0;
  const totalPoints = filteredStats.length ? filteredStats[0].totalPoints : 0;
  const inviteCount: number = filteredStats.length
    ? filteredStats[0].inviteCount
    : 0;

  return (
    <div>
      <div className="stats shadow w-full">
        <MintStats mintCount={mintCount} />
        <BridgeStats bridgeCount={bridgeCount} />
        <StreakStats currentStreak={currentStreak} />
        <ReferralStats inviteCount={inviteCount} />
      </div>

      <span className="block text-right p-2">
        Your total XP:{" "}
        <span className="font-bold">{totalPoints ? totalPoints : 0}</span>
      </span>
    </div>
  );
};

export default UserStats;
