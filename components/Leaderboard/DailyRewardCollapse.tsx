import { FaAward } from "react-icons/fa";
import { useAccount } from "wagmi";
import handleInteraction from "../../utils/helpers/handleInteraction";
import { useState, useEffect } from "react";
import { callDailyRewardsData } from "../../utils/api/callRewardAPI";

interface RewardData {
  id: number;
  day: number;
  points: number;
  reward: string;
  description: string;
}

const DailyRewardCollapse = (props: { currentRewardDay: number }) => {
  const { currentRewardDay } = props;
  const { address } = useAccount();
  const [rewardsData, setRewardsData] = useState([]);
  const [currentRewardData, setCurrentRewardData] = useState<RewardData>();

  useEffect(() => {
    if (!address || rewardsData.length) return;
    fetchDailyRewardsData().then((data) => {
      console.log("data is fetched");
      setRewardsData(data);
      console.log(data);
      const currentReward = data.find(
        (reward: RewardData) => reward.day === currentRewardDay
      );
      setCurrentRewardData(currentReward);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (!rewardsData) return;
    const currentReward = rewardsData.find(
      (reward: RewardData) => reward.day === currentRewardDay
    );
    setCurrentRewardData(currentReward);
  }, [currentRewardDay, rewardsData]);

  const handleClaim = async () => {
    if (!currentRewardData || !address) return;
    console.log("claimed");
    console.log(currentRewardData);
    const { day } = currentRewardData;
    // const response = await handleInteraction({
    //   address,
    //   day,
    //   operation: "claim_daily_reward",
    // });
    // const data = await response.json();
    // return data;
  };

  const fetchDailyRewardsData = async () => {
    const response = await callDailyRewardsData();
    const data = await response.json();
    return data.data;
  };

  return (
    <div
      tabIndex={0}
      className="collapse collapse-plus border border-base-300 bg-base-200 w-full"
    >
      <div className="collapse-title text-xl font-medium">Daily rewards</div>

      <div className="collapse-content flex justify-center flex-col items-center">
        <p className="px-4 py-2 text-content-focus text-center">
          Engage with our platform daily and earn rewards. Each day offers a
          higher reward than the previous. Claim your reward each day and watch
          your points grow!
        </p>
        <div className="reward-card p-4 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 text-gray-600"></div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <FaAward className="w-[64px] h-[64px] text-yellow-500" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Day {currentRewardData?.day ? currentRewardData?.day : 1} Reward
              </h2>
              <p>
                +{currentRewardData?.points ? currentRewardData?.points : 30} XP
              </p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClaim}
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyRewardCollapse;
