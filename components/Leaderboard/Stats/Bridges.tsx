import { FaPlaneDeparture } from "react-icons/fa";

const BridgeStats = (props: { bridgeCount: number }) => {
  const { bridgeCount } = props;
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <FaPlaneDeparture className="w-[32px] h-[32px]" />
      </div>
      <div className="stat-title">Bridges</div>
      <div className="stat-value">{bridgeCount > 0 ? bridgeCount : 0}</div>
      <div className="stat-desc">50 XP each</div>
    </div>
  );
};

export default BridgeStats;
