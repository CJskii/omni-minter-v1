export interface LeaderboardRowProps {
  user: any;
  index: number;
}

export interface User {
  ethereumAddress: string;
  totalPoints: number;
  inviteLink: string;
  currentRewardDay?: any;
  lastRewardClaimedAt: string;
  mints: [
    {
      count: number;
    }
  ];
  bridges: [
    {
      count: number;
    }
  ];
  interactions: [
    {
      count: number;
    }
  ];
  streaks: [
    {
      currentStreak: number;
    }
  ];
}

export interface LeaderboardData {
  leaderboard: User[];
}
