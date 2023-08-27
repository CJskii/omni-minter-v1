import { FaUserFriends } from "react-icons/fa";

const ReferralStats = (props: any) => {
  const { inviteCount } = props;
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <FaUserFriends className="w-[32px] h-[32px]" />
      </div>
      <div className="stat-title">Invites</div>
      <div className="stat-value">{inviteCount ? inviteCount : 0}</div>
      <div className="stat-desc">150 XP each</div>
    </div>
  );
};

export default ReferralStats;
