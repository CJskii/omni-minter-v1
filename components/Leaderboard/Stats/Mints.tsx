import { FaChartLine } from "react-icons/fa";

const MintStats = (props: { mintCount: number }) => {
  const { mintCount } = props;
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">
        <FaChartLine className="w-[32px] h-[32px]" />
      </div>
      <div className="stat-title">Mints</div>
      <div className="stat-value"> {mintCount > 0 ? mintCount : 0}</div>
      <div className="stat-desc">100 XP each</div>
    </div>
  );
};

export default MintStats;
