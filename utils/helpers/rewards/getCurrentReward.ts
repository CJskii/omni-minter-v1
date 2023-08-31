import { differenceInCalendarDays, parseISO } from "date-fns";

interface RewardData {
  id: number;
  day: number;
  points: number;
  reward: string;
  description: string;
}

export const getCurrentReward = ({
  rewardsData,
  currentRewardDay,
  lastRewardClaimedAt,
}: {
  rewardsData: RewardData[];
  currentRewardDay: number;
  lastRewardClaimedAt: string;
}) => {
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

  return currentReward;
};
