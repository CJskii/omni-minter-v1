import { FaAward } from "react-icons/fa";
import { useAccount } from "wagmi";
import handleInteraction from "../../utils/helpers/handleInteraction";
import { useState, useEffect } from "react";
import { callDailyRewardsData } from "../../utils/api/callRewardAPI";
import { differenceInCalendarDays, parseISO } from "date-fns";

interface RewardData {
  id: number;
  day: number;
  points: number;
  reward: string;
  description: string;
}

const DailyRewardCollapse = (props: {
  currentRewardDay: number;
  lastRewardClaimedAt: string;
  setUserData: any;
}) => {
  const { currentRewardDay, setUserData, lastRewardClaimedAt } = props;
  const { address } = useAccount();
  const [rewardsData, setRewardsData] = useState([]);
  const [currentRewardData, setCurrentRewardData] = useState<RewardData>();

  // Determine whether the "Claim" button should be disabled
  const today = new Date();
  const lastClaimedDate = parseISO(props.lastRewardClaimedAt);
  const daysDifference = differenceInCalendarDays(today, lastClaimedDate);
  const isClaimButtonDisabled = daysDifference === 0;

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
    // Calculate the difference between the current date and the last claimed date
    const today = new Date();
    const lastClaimedDate = parseISO(lastRewardClaimedAt);
    const daysDifference = differenceInCalendarDays(today, lastClaimedDate);

    let newRewardDay = currentRewardDay;

    // Reset the reward day to 1 if the last claimed date was more than a day ago
    if (daysDifference > 1) {
      newRewardDay = 1;
    }
    // If the last claimed date was yesterday, increment the reward day
    else if (daysDifference === 1) {
      newRewardDay = Math.min(currentRewardDay, 8); // Max day is 8
    }

    // Find the reward data for the new reward day
    const currentReward = rewardsData.find(
      (reward: RewardData) => reward.day === newRewardDay
    );
    setCurrentRewardData(currentReward);
  }, [lastRewardClaimedAt, currentRewardDay, rewardsData]);

  const handleClaim = async () => {
    if (!currentRewardData || !address) return;
    console.log("claimed");
    console.log(currentRewardData);
    const { day } = currentRewardData;
    const response = await handleInteraction({
      address,

      operation: "claim_daily_reward",
    });
    if (response.status === "success") {
      setUserData((prev: any) => {
        return [
          {
            ...prev[0],
            lastRewardClaimedAt: new Date().toISOString(),
            currentRewardDay: response.data.newRewardDay,
            totalPoints: response.data.totalPoints,
          },
        ];
      });
      console.log(response);
    } else {
      console.log(response);
    }
    // console.log(response);
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
                  disabled={isClaimButtonDisabled}
                >
                  {isClaimButtonDisabled ? "Come back tomorrow" : "Claim"}
                  {/* Claim */}
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
