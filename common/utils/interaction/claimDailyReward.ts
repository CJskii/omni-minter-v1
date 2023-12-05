import handleInteraction from "./handlers/handleInteraction";

export const claimDailyReward = async ({
  address,
  setUserData,
}: {
  address: string;
  setUserData: (data: any) => void;
}) => {
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
  } else {
    console.log(response);
  }
  return response;
};
