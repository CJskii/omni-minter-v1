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
      <div className="stat-desc">
        {currentStreak === 0
          ? "20 XP each"
          : currentStreak >= 1 && currentStreak <= 7
          ? "20 XP each"
          : currentStreak >= 8 && currentStreak <= 14
          ? "40 XP each"
          : currentStreak >= 15 && currentStreak <= 30
          ? "75 XP each"
          : currentStreak > 30
          ? "100 XP each"
          : "20 XP each"}
      </div>
    </div>
  );
};

export default StreakStats;
