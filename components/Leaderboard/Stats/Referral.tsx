import { FaUserFriends } from "react-icons/fa";

const ReferralStats = () => {
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <FaUserFriends className="w-[32px] h-[32px]" />
      </div>
      <div className="stat-title">Invites</div>
      <div className="stat-value">4,200</div>
      <div className="stat-desc">150 XP each</div>
    </div>
  );
};

export default ReferralStats;
