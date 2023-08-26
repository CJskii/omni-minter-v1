import { FaFireAlt } from "react-icons/fa";

const StreakStats = (props: { currentStreak: number }) => {
  const { currentStreak } = props;
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <FaFireAlt className="w-[32px] h-[32px]" />
      </div>
      <div className="stat-title">Streak</div>
      <div className="stat-value"> {currentStreak > 0 ? currentStreak : 0}</div>
      <div className="stat-desc">20 XP each</div>
    </div>
  );
};

export default StreakStats;
