import { differenceInCalendarDays, parseISO } from "date-fns";

export const shouldDisableClaimButton = (lastRewardClaimedAt: any) => {
  const today = new Date();
  const lastClaimedDate = parseISO(lastRewardClaimedAt);
  const daysDifference = differenceInCalendarDays(today, lastClaimedDate);
  const isClaimButtonDisabled = daysDifference === 0;
  return isClaimButtonDisabled;
};
