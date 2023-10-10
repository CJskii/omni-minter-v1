import { FaAward } from "react-icons/fa";
import { useAccount } from "wagmi";
import { claimDailyReward } from "../../../utils/helpers/rewards/claimDailyReward";
import { useState, useEffect } from "react";
import { callDailyRewardsData } from "../../../utils/api/callRewardAPI";
import { getCurrentReward } from "../../../utils/helpers/rewards/getCurrentReward";
import { shouldDisableClaimButton } from "../../../utils/helpers/rewards/shouldDisableClaimButton";
import UserRewardModal from "./UserRewardModal";
import { RewardData } from "../../../types/rewards";

const DailyRewardCollapse = (props: {
  currentRewardDay: number;
  lastRewardClaimedAt: string;
  setUserData: any;
}) => {
  const { currentRewardDay, setUserData, lastRewardClaimedAt } = props;
  const { address } = useAccount();
  const [rewardsData, setRewardsData] = useState([]);
  const [currentRewardData, setCurrentRewardData] = useState<RewardData>();
  const [isLoading, setIsLoading] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const isClaimButtonDisabled = shouldDisableClaimButton(lastRewardClaimedAt);

  useEffect(() => {
    if (!address || rewardsData.length) return;
    fetchDailyRewardsData().then((data) => {
      setRewardsData(data);
      const currentReward = data.find(
        (reward: RewardData) => reward.day === currentRewardDay
      );
      setCurrentRewardData(currentReward);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (!rewardsData.length) return;
    const currentReward = getCurrentReward({
      rewardsData,
      currentRewardDay,
      lastRewardClaimedAt,
    });
    setCurrentRewardData(currentReward);
  }, [lastRewardClaimedAt, currentRewardDay, rewardsData]);

  const handleClaim = async () => {
    if (!currentRewardData || !address) return;
    setIsLoading(true);
    setShowRewardModal(true);
    const response = await claimDailyReward({
      address,
      setUserData,
    });
    setIsLoading(false);
    setResponse(response);
  };

  const fetchDailyRewardsData = async () => {
    const response = await callDailyRewardsData();
    const data = await response.json();
    return data.data;
  };

  const renderButtonText = () => {
    if (isClaimButtonDisabled && !isLoading) {
      return "Come back tomorrow";
    } else if (isLoading) {
      return <span className="loading loading-infinity loading-md"></span>;
    } else {
      return "Claim";
    }
  };

  return (
    <>
      <UserRewardModal
        showRewardModal={showRewardModal}
        setShowRewardModal={setShowRewardModal}
        response={response}
        isLoading={isLoading}
      />
      <div
        tabIndex={0}
        className="collapse collapse-plus border border-base-300 bg-base-200 w-full"
      >
        <div className="collapse-title text-xl font-medium">Daily rewards</div>

        <div className="collapse-content flex justify-center flex-col items-center">
          <p className="px-4 py-2 text-content-focus text-center">
            Engage with our platform daily and earn rewards. Each day offers a
            higher reward than the previous. Claim your reward each day and
            watch your points grow!
          </p>
          <div className="reward-card p-4 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 text-gray-600"></div>
            <div className="card w-full sm:w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <FaAward className="w-[64px] h-[64px] sm:w-[100px] sm:h-[100px] text-yellow-500" />
              </figure>
              <div className="card-body items-center text-center">
                <span className="text-neutral-content text-lg">
                  Day {currentRewardData?.day ? currentRewardData?.day : 1}
                </span>
                <h2 className="card-title pb-2 text-2xl">
                  {currentRewardData?.reward
                    ? currentRewardData?.reward
                    : "Reward"}
                </h2>
                <div className="card-actions">
                  <button
                    className="btn btn-primary max-w-[100%]"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClaim}
                    disabled={isClaimButtonDisabled}
                  >
                    {renderButtonText()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyRewardCollapse;
