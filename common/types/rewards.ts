export interface RewardData {
  id: number;
  day: number;
  points: number;
  reward: string;
  description: string;
}

export interface UserRewardModal {
  showRewardModal: boolean;
  setShowRewardModal: (show: boolean) => void;
  isLoading: boolean;
  response: any;
}
